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
import { LogOut, User, Mail, Shield, AlertCircle, Wallet, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface DashboardData {
  user: {
    email: string;
    role: string;
    kycStatus: string;
    referralCode: string;
    wallets: Array<{
      currency: string;
      balance: string;
      lockedBalance: string;
    }>;
  };
  platform: {
    name: string;
    tagline: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    howItWorks: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
  quickStats: {
    totalWallets: number;
    totalBalance: string;
    kycCompleted: boolean;
    accountAge: number;
  };
  nextSteps: Array<{
    title: string;
    description: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Fetch dashboard data from new endpoint
        const response = await api.get('/api/v1/users/dashboard');
        const data = response.data as DashboardData;
        
        setDashboardData(data);
        setUser({
          id: '',
          email: data.user.email,
          role: data.user.role as 'BUYER' | 'SELLER',
          isVerified: true,
        });
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
          setError(error.response?.data?.message || 'Failed to load dashboard. Please try again.');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [setUser, logout, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleRetry = () => {
    setError('');
    setLoading(true);
    setDashboardData(null);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
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
            <h1 className="text-2xl font-bold">{dashboardData?.platform.name}</h1>
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
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Welcome back{dashboardData?.user.email ? `, ${dashboardData.user.email.split('@')[0]}` : ''}!</h2>
          <p className="text-muted-foreground text-lg">{dashboardData?.platform.tagline}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold">${dashboardData?.quickStats.totalBalance}</p>
                </div>
                <Wallet className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wallets</p>
                  <p className="text-2xl font-bold">{dashboardData?.quickStats.totalWallets}</p>
                </div>
                <Wallet className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">KYC Status</p>
                  <p className="text-2xl font-bold">{dashboardData?.user.kycStatus}</p>
                </div>
                <Shield className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Account Age</p>
                  <p className="text-2xl font-bold">{dashboardData?.quickStats.accountAge}d</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        {dashboardData && dashboardData.nextSteps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.nextSteps.map((step, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(step.priority)}`}>
                        {step.priority}
                      </span>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="secondary">
                      {step.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                <span>{dashboardData?.user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Role: <span className="font-semibold text-primary">{dashboardData?.user.role}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Referral Code:</span>
                <code className="px-2 py-1 bg-secondary rounded text-primary font-mono">{dashboardData?.user.referralCode}</code>
              </div>
            </CardContent>
          </Card>

          {/* Wallets Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
              <CardDescription>Your wallet balances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData?.user.wallets.map((wallet, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-sm font-semibold text-muted-foreground">{wallet.currency}</span>
                  <div className="text-right">
                    <div className="text-lg font-bold">{wallet.balance}</div>
                    {parseFloat(wallet.lockedBalance) > 0 && (
                      <div className="text-xs text-muted-foreground">Locked: {wallet.lockedBalance}</div>
                    )}
                  </div>
                </div>
              ))}
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
                {dashboardData?.user.role === 'SELLER' ? 'Create Ad' : 'Browse Ads'}
              </Button>
              <Button className="w-full" variant="secondary">
                Transaction History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* About Platform */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About {dashboardData?.platform.name}</CardTitle>
              <CardDescription className="text-base">{dashboardData?.platform.description}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Platform Features */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData?.platform.features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData?.platform.howItWorks.map((step, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow relative">
                <CardHeader>
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg mt-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Status */}
        <div>
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
