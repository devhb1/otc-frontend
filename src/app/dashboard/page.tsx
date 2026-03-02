'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DashboardSkeleton } from '@/components/ui/skeleton';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">OTC Platform</h1>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">OTC Platform</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">OTC Platform</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your trades and account from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Role: {user?.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Verified
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Wallets Card */}
          <Card>
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
              <CardDescription>Your wallet balances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MAAL</span>
                <span className="text-lg font-semibold">0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">USDT</span>
                <span className="text-lg font-semibold">0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">USD</span>
                <span className="text-lg font-semibold">$0.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                View Market
              </Button>
              <Button className="w-full" variant="outline">
                {user?.role === 'SELLER' ? 'Create Ad' : 'Browse Ads'}
              </Button>
              <Button className="w-full" variant="outline">
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
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-600">
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
