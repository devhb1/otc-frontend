'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/theme-toggle';
import { AlertCircle, CheckCircle } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false);

  useEffect(() => {
    if (verified === 'true') {
      setShowVerifiedMessage(true);
      setTimeout(() => setShowVerifiedMessage(false), 5000);
    }
  }, [verified]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/v1/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Save tokens to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      // Update auth state
      setUser(response.data.user);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error.response?.data?.message || 'Login failed. Please try again.';

      // Check if user needs to verify email
      if (message.toLowerCase().includes('verify') || message.toLowerCase().includes('verification')) {
        setError('Please verify your email first.');
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        }, 2000);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              OTC Platform
            </h1>
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your OTC Platform account</CardDescription>
          </CardHeader>
          <CardContent>
            {showVerifiedMessage && (
              <Alert variant="success" className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Email verified successfully! You can now log in.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm text-brand-grey-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-brand-accent-primary hover:text-brand-accent-primary/80 font-semibold transition">
                  Sign up
                </Link>
              </div>
              <div className="text-center text-sm">
                <Link href="/verify-email" className="text-brand-accent-secondary hover:text-brand-accent-secondary/80 font-semibold transition">
                  Verify email address
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
