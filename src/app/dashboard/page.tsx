'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DashboardSkeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogOut, User, Mail, Shield, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      if (!user) {
        try {
          // Fetch user profile with timeout
          const response = await api.get('/api/v1/users/me');
          setUser(response.data);
          setError('');
        } catch (err) {
          // Handle different error types
          const error = err as { response?: { status?: number; data?: { message?: string } }; code?: string };

          if (error.code === 'ECONNABORTED') {
            setError('Request timeout. Please check your connection.');
          } else if (error.response?.status === 401) {
            // Token invalid, redirect to login
            logout();
            router.push('/login');
            return;
          } else if (error.response?.status === 403) {
            setError('Access denied. Please contact support.');
          } else {
            setError(error.response?.data?.message || 'Failed to load profile. Please try again.');
          }
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [user, setUser, logout, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleRetry = () => {
    setError('');
    setLoading(true);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">OTC Platform</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">OTC Platform</h1>
            <div className="flex gap-3 items-center">
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={handleRetry}>Try Again</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">OTC Platform</h1>
          </div>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Welcome back!</h2>
          <p className="text-muted-foreground text-lg">Manage your trades and account from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Role: <span className="font-semibold text-primary">{user?.role}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30">
                  ✓ Verified
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Wallets Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
              <CardDescription>Your wallet balances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm font-semibold text-muted-foreground">MAAL</span>
                <span className="text-lg font-bold">0.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm font-semibold text-muted-foreground">USDT</span>
                <span className="text-lg font-bold">0.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm font-semibold text-muted-foreground">USD</span>
                <span className="text-lg font-bold">$0.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="secondary">
                View Market
              </Button>
              <Button className="w-full" variant="secondary">
                {user?.role === 'SELLER' ? 'Create Ad' : 'Browse Ads'}
              </Button>
              <Button className="w-full" variant="secondary">
                Transaction History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
              <CardDescription>Everything is working smoothly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium">
                  All systems operational
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
