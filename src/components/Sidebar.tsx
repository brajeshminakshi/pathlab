'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  FileText,
  Package,
  PillBottle,
  Settings,
  Users,
  Pill,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ['lab_admin', 'doctor', 'pathologist', 'receptionist', 'technician'],
  },
  {
    label: 'Patients',
    href: '/dashboard/patients',
    icon: <Users className="h-5 w-5" />,
    roles: ['lab_admin', 'doctor', 'pathologist', 'receptionist', 'technician'],
  },
  {
    label: 'Tests',
    href: '/dashboard/tests',
    icon: <PillBottle className="h-5 w-5" />,
    roles: ['lab_admin', 'technician'],
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText className="h-5 w-5" />,
    roles: ['lab_admin', 'doctor', 'pathologist', 'technician'],
  },
  {
    label: 'Inventory',
    href: '/dashboard/inventory',
    icon: <Package className="h-5 w-5" />,
    roles: ['lab_admin', 'technician'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['lab_admin'],
  },
];

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const visibleItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary-600 p-3 text-white shadow-lg md:hidden hover:bg-primary-700"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 border-r border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900 transition-transform md:relative md:translate-x-0 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="border-b border-secondary-200 px-6 py-6 dark:border-secondary-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary-600 p-2">
              <Pill className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              Path<span className="text-primary-600">Lab</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 p-4">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Role Badge */}
        <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-secondary-100 p-3 text-center dark:bg-secondary-800">
          <p className="text-xs font-semibold text-secondary-600 uppercase dark:text-secondary-400">
            Role: {user.role.replace(/_/g, ' ')}
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
