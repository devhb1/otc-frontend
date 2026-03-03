import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Zap, Users, ArrowRight, TrendingUp, Lock, CheckCircle2, BarChart3, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              OTC Platform
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="font-semibold">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-semibold mb-8">
            <Lock className="h-4 w-4 text-primary" />
            <span>Secure & Verified Trading Platform</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Over-the-Counter
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience secure peer-to-peer cryptocurrency trading with verified users.
            Email verification, instant access, and flexible trading roles for maximum convenience.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="text-base">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-base">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold">Email Verified</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold">Secure Trading</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold">Fast Setup</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle>Secure & Verified</CardTitle>
              <CardDescription>
                Advanced email verification and JWT authentication protect your account.
                Every transaction is secured with industry-standard encryption.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Register in under 2 minutes with instant email verification.
                Start trading immediately after your account is verified.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-white" />
              </div>
              <CardTitle>Flexible Roles</CardTitle>
              <CardDescription>
                Register as a Buyer or Seller. Switch roles anytime or operate with both
                roles to maximize your trading opportunities.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 bg-card border border-border rounded-2xl p-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Get Started in 3 Simple Steps
            </h3>
            <p className="text-muted-foreground text-lg">
              Join thousands of traders in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h4 className="text-2xl font-bold mb-3">Create Account</h4>
              <p className="text-muted-foreground leading-relaxed">
                Sign up with your email address and choose your preferred trading role -
                Buyer or Seller. Takes less than 60 seconds.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h4 className="text-2xl font-bold mb-3">Verify Email</h4>
              <p className="text-muted-foreground leading-relaxed">
                Enter the 6-digit verification code sent to your inbox.
                Instant verification ensures account security.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h4 className="text-2xl font-bold mb-3">Start Trading</h4>
              <p className="text-muted-foreground leading-relaxed">
                Access your dashboard, manage multiple wallets,
                and begin trading cryptocurrencies securely.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">$10M+</div>
                  <div className="text-sm text-muted-foreground">Trading Volume</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">5,000+</div>
                  <div className="text-sm text-muted-foreground">Active Traders</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">15K+</div>
                  <div className="text-sm text-muted-foreground">Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-none">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-4xl font-bold mb-4 text-white">Ready to Start Trading?</h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of verified traders on the most secure OTC platform.
                Create your free account today and start trading in minutes.
              </p>
              <Link href="/register">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-blue-200 text-sm mt-6 font-medium">
                No credit card required • Free forever • 2-minute setup
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card mt-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">OTC Platform</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Secure peer-to-peer cryptocurrency trading with verified users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="/register" className="hover:text-primary transition">Register</Link></li>
                <li><Link href="/login" className="hover:text-primary transition">Sign In</Link></li>
                <li><a href="#features" className="hover:text-primary transition">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 OTC Platform. All rights reserved.
            </p>
            <div className="flex gap-2 mt-4 md:mt-0 items-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-muted-foreground text-sm">Secure Trading Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
