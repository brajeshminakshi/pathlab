import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';

export const metadata: Metadata = {
  title: 'Tests - PathLab',
  description: 'Test catalog management',
};

export default function TestsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Tests</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Manage laboratory tests and test parameters
          </p>
        </div>

        <div className="rounded-lg border border-secondary-200 bg-white p-8 text-center dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-secondary-600 dark:text-secondary-400">
            Test management interface coming in Phase 5
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
