import type { Metadata } from 'next';
import { env } from '@/env';
import './globals.css';

export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_APP_NAME} - Pathology Laboratory Management System`,
  description: 'A comprehensive, multi-tenant SaaS platform for managing pathology laboratories efficiently.',
  keywords: ['pathology', 'laboratory', 'management', 'saas', 'healthcare', 'reports', 'invoicing'],
  authors: [{ name: 'Brajesh Minakshi' }],
  creator: 'Brajesh Minakshi',
  publisher: 'PathLab',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
