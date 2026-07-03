import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { InventoryManagementPage } from '@/features/inventory/InventoryManagementPage';

export const metadata: Metadata = {
  title: 'Inventory - PathLab',
  description: 'Inventory and stock management',
};

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <InventoryManagementPage />
    </DashboardLayout>
  );
}
