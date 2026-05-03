import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-surface rounded-xl p-6',
    elevated: 'bg-surface-2 rounded-xl p-6 shadow-lg shadow-black/50',
    bordered: 'bg-surface rounded-xl p-6 border border-[#2a2a2a]',
  };

  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}
