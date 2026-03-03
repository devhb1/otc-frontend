'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert'; import { ThemeToggle } from '@/components/theme-toggle'; import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/v1/auth/verify-email', {
        email,
        otp: otpCode,
      });

      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 2000);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Invalid or expired code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResendLoading(true);

    try {
      await api.post('/api/v1/auth/resend-otp', { email });
      setSuccess('New code sent! Check your email.');
      setResendTimer(60); // 60 second cooldown
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResendLoading(false);
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
            <div className="w-12 h-12 bg-gradient-to-br from-brand-accent-primary to-brand-accent-secondary rounded-lg flex items-center justify-center shadow-medium">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary bg-clip-text text-transparent">
              OTC Platform
            </h1>
          </div>
        </div>
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-accent-primary/20 to-brand-accent-secondary/20 rounded-2xl flex items-center justify-center mb-4 border-2 border-brand-accent-primary/30">
              <Mail className="h-8 w-8 text-brand-accent-primary" />
            </div>
            <CardTitle className="text-3xl">Verify Your Email</CardTitle>
            <CardDescription className="text-base mt-3">
              We sent a 6-digit code to<br />
              <strong className="text-brand-grey-100">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-brand-grey-700 bg-brand-grey-900 text-brand-grey-100 rounded-lg focus:border-brand-accent-primary focus:outline-none focus:ring-2 focus:ring-brand-accent-primary/50 transition-all disabled:opacity-50"
                    disabled={loading}
                    required
                  />
                ))}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-brand-grey-400">
                Didn&apos;t receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={resendLoading || resendTimer > 0}
                className="text-brand-accent-primary hover:text-brand-accent-primary/80"
              >
                {resendLoading
                  ? 'Sending...'
                  : resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : 'Resend Code'}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-brand-grey-400">
              <Link href="/register" className="text-brand-accent-secondary hover:text-brand-accent-secondary/80 font-semibold transition">
                Use a different email
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
