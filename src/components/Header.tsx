'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h2 className="text-sm text-secondary-600 dark:text-secondary-400">
            Welcome, <span className="font-semibold text-secondary-900 dark:text-white">{user?.name}</span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-secondary-900 dark:text-white">
              {user?.name}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-secondary-200 bg-white shadow-lg dark:border-secondary-700 dark:bg-secondary-800">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-secondary-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
