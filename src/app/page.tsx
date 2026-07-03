'use client';

import Link from 'next/link';
import { Pill } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary-50 to-secondary-50 p-4 dark:from-secondary-900 dark:to-secondary-950">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-primary-500 to-primary-600 p-4">
            <Pill className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-secondary-900 dark:text-white">
          Path<span className="text-primary-600">Lab</span>
        </h1>

        <p className="mt-2 text-xl text-secondary-600 dark:text-secondary-300">
          Multi-Tenant Pathology Laboratory Management System
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-center text-secondary-700 dark:text-secondary-200 max-w-md">
          A comprehensive, production-ready SaaS platform for managing pathology laboratories
          with multi-tenant architecture, RBAC, and enterprise-grade features.
        </p>
      </div>

      <div className="mt-12 flex gap-4 flex-wrap justify-center">
        <Link
          href="/auth/login"
          className="rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-lg border border-primary-600 px-8 py-3 font-semibold text-primary-600 hover:bg-primary-50 dark:hover:bg-secondary-900 transition-colors"
        >
          Sign Up
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-secondary-900 dark:border dark:border-secondary-800">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Multi-Tenant</h3>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Complete data isolation per organization with shared infrastructure
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-secondary-900 dark:border dark:border-secondary-800">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">RBAC</h3>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Role-based access control with fine-grained permissions for every module
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-secondary-900 dark:border dark:border-secondary-800">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Enterprise-Grade</h3>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Built with TypeScript, Firebase, Next.js, and production-ready patterns
          </p>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-secondary-500 dark:text-secondary-400">
        <p>Phase 1: Project Initialization ✓</p>
        <p className="mt-2">Next: Phase 2 - Authentication & RBAC</p>
      </div>
    </main>
  );
}
