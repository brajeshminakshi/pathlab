import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';

export const metadata: Metadata = {
  title: 'Settings - PathLab',
  description: 'Organization settings',
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Manage organization settings and preferences
          </p>
        </div>

        <div className="rounded-lg border border-secondary-200 bg-white p-8 text-center dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-secondary-600 dark:text-secondary-400">
            Settings management interface coming in Phase 10
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
