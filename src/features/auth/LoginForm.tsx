'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-danger-50 p-4 text-danger-600 border border-danger-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-secondary-900 dark:text-white">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-900 dark:text-white">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="•��••••••"
        />
        {errors.password && <p className="mt-1 text-sm text-danger-600">{errors.password.message}</p>}
      </div>

      <SubmitButton className="w-full">Sign In</SubmitButton>

      <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}
