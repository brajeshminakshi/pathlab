import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';

export const metadata: Metadata = {
  title: 'Reports - PathLab',
  description: 'Lab reports and results',
};

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Reports</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            View and manage laboratory reports
          </p>
        </div>

        <div className="rounded-lg border border-secondary-200 bg-white p-8 text-center dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-secondary-600 dark:text-secondary-400">
            Report management interface coming in Phase 7
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
