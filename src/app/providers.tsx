'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { OrganizationProvider } from '@/context/OrganizationContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <OrganizationProvider>{children}</OrganizationProvider>
    </AuthProvider>
  );
}
