'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/utils/cn';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function SubmitButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const baseStyles = 'font-semibold rounded-lg transition-colors disabled:opacity-50';

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400',
    secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 disabled:bg-secondary-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
}
