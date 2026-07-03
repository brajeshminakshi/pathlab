import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Organization } from '@/types';

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  logoUrl?: string;
  websiteUrl?: string;
  taxNumber?: string;
  licenseExpiry?: Date;
  reportTemplate: 'standard' | 'premium' | 'minimal';
  theme: 'light' | 'dark';
  timezone: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function initializeOrganizationSettings(
  organizationId: string,
  userId: string
) {
  try {
    const settingsRef = collection(db, 'organizations', organizationId, 'settings');
    const defaultSettings: OrganizationSettings = {
      id: 'default',
      organizationId,
      reportTemplate: 'standard',
      theme: 'light',
      timezone: 'UTC',
      currency: 'USD',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(settingsRef, 'default'), defaultSettings);
    console.log('Organization settings initialized');
  } catch (error) {
    console.error('Error initializing organization settings:', error);
    throw error;
  }
}
