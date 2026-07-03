'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useOrganization } from '@/context/OrganizationContext';

export function DashboardContent() {
  const { user } = useAuth();
  const { organization } = useOrganization();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-secondary-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-secondary-600 dark:text-secondary-400">
          Organization: {organization?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* TODO: Add dashboard cards */}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
