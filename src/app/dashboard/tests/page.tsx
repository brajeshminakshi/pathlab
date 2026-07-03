import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TestsManagementPage } from '@/features/tests/TestsManagementPage';

export const metadata: Metadata = {
  title: 'Tests - PathLab',
  description: 'Test catalog management',
};

export default function TestsPage() {
  return (
    <DashboardLayout>
      <TestsManagementPage />
    </DashboardLayout>
  );
}
