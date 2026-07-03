import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardStats } from '@/components/DashboardStats';

export const metadata: Metadata = {
  title: 'Dashboard - PathLab',
  description: 'Your PathLab dashboard',
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardStats />
    </DashboardLayout>
  );
}
