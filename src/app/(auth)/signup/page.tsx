import type { Metadata } from 'next';
import { Pill } from 'lucide-react';
import { SignupForm } from '@/features/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - PathLab',
  description: 'Create a new PathLab account',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50 p-4 dark:from-secondary-900 dark:to-secondary-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-gradient-to-br from-primary-500 to-primary-600 p-3">
              <Pill className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Path<span className="text-primary-600">Lab</span>
          </h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">Create your account</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-secondary-900 dark:border dark:border-secondary-800">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
