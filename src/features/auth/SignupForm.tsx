'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import { User } from '@/types';

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    organizationName: z.string().min(2, 'Organization name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;

      // Create Organization document
      const organizationId = `org_${Date.now()}`;
      await setDoc(doc(db, 'organizations', organizationId), {
        id: organizationId,
        name: data.organizationName,
        contactEmail: data.email,
        subscriptionPlan: 'free',
        subscriptionStatus: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: uid,
      });

      // Create User document
      const userData: User = {
        id: uid,
        email: data.email,
        name: data.name,
        role: 'lab_admin',
        organizationId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: uid,
      };

      await setDoc(doc(db, 'users', uid), userData);

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
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
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-danger-600">{errors.name.message}</p>}
      </div>

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
          Organization Name
        </label>
        <input
          {...register('organizationName')}
          type="text"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="Your Lab Name"
        />
        {errors.organizationName && (
          <p className="mt-1 text-sm text-danger-600">{errors.organizationName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-900 dark:text-white">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="••••••••"
        />
        {errors.password && <p className="mt-1 text-sm text-danger-600">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-900 dark:text-white">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="mt-1 w-full rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-danger-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <SubmitButton className="w-full">Create Account</SubmitButton>

      <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}
