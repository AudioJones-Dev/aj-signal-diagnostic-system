'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface LeadCaptureFormProps {
  onSubmit: (name: string, email: string) => void;
  isLoading?: boolean;
}

export function LeadCaptureForm({ onSubmit, isLoading = false }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name.trim(), email.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2">
          Your Diagnostic is Ready
        </h2>
        <p className="text-[#a3a3a3]">
          Enter your details to unlock your personalized Signal Diagnostic Report.
        </p>
      </div>

      <Card variant="bordered">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#f5f5f5] mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-primary transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#f5f5f5] mb-2">
              Business Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-primary transition-colors"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Report...' : 'Unlock My Diagnostic Report →'}
          </Button>

          <p className="text-center text-xs text-[#555] mt-3">
            No spam. Your data helps us personalize your results.
          </p>
        </form>
      </Card>
    </div>
  );
}
