'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Organization } from '@/types';
import { useAuth } from './AuthContext';

interface OrganizationContextType {
  organization: Organization | null;
  organizationId: string | null;
  setOrganizationId: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.organizationId) {
      setOrganizationId(user.organizationId);
    }
  }, [user]);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!organizationId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orgDocRef = doc(db, 'organizations', organizationId);
        const orgDoc = await getDoc(orgDocRef);

        if (orgDoc.exists()) {
          const data = orgDoc.data();
          setOrganization({
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Organization);
        } else {
          setError('Organization not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch organization');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  return (
    <OrganizationContext.Provider
      value={{ organization, organizationId, setOrganizationId, loading, error }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}
