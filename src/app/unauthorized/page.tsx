import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized - PathLab',
  description: 'Access denied',
};

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50 p-4 dark:from-secondary-900 dark:to-secondary-950">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-danger-600">403</h1>
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Access Denied</h2>
        <p className="text-secondary-600 dark:text-secondary-400 max-w-md">
          You do not have permission to access this resource. Contact your administrator if you
          believe this is an error.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
