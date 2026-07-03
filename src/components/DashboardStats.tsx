'use client';

import { useOrganization } from '@/context/OrganizationContext';
import { BarChart3, Users, FileText, Package } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-secondary-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white">{value}</p>
          {trend && (
            <p
              className={`mt-2 text-sm font-medium ${
                trend.isPositive ? 'text-success-600' : 'text-danger-600'
              }`}
            >
              {trend.isPositive ? '+' : '-'}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
          <div className="text-primary-600 dark:text-primary-400">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const { organization } = useOrganization();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
          {organization?.name} Dashboard
        </h1>
        <p className="mt-2 text-secondary-600 dark:text-secondary-400">
          Welcome to your laboratory management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value="--"
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Reports"
          value="--"
          icon={<FileText className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Tests Available"
          value="--"
          icon={<Package className="h-6 w-6" />}
        />
        <StatCard
          title="Monthly Revenue"
          value="--"
          icon={<BarChart3 className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* TODO: Add more dashboard sections */}
      <div className="rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 p-8 text-center dark:border-secondary-700 dark:bg-secondary-900">
        <p className="text-secondary-600 dark:text-secondary-400">
          More dashboard features coming in Phase 5+
        </p>
      </div>
    </div>
  );
}
