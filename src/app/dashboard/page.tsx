import type { Metadata } from 'next';
import { DashboardContent } from '@/features/dashboard/DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard - PathLab',
  description: 'Your PathLab dashboard',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary-50 p-8 dark:bg-secondary-950">
      <DashboardContent />
    </div>
  );
}
