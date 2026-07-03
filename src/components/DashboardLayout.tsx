'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-secondary-50 dark:bg-secondary-950">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden md:ml-0">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="p-6 md:p-8">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
