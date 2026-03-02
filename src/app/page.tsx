import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, ArrowRight, TrendingUp, Lock, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OTC Platform
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Lock className="h-4 w-4" />
            <span>Secure & Verified Trading Platform</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Over-the-Counter
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Experience secure peer-to-peer cryptocurrency trading with verified users.
            Email verification, instant access, and flexible trading roles for maximum convenience.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:border-blue-600 hover:text-blue-600 transition-all">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium">Email Verified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium">Secure Trading</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium">Fast Setup</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Secure & Verified</CardTitle>
              <CardDescription className="text-base">
                Advanced email verification and JWT authentication protect your account.
                Every transaction is secured with industry-standard encryption.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Lightning Fast</CardTitle>
              <CardDescription className="text-base">
                Register in under 2 minutes with instant email verification.
                Start trading immediately after your account is verified.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Flexible Roles</CardTitle>
              <CardDescription>
                Register as a Buyer or Seller. Switch roles anytime or operate with both
                roles to maximize your trading opportunities.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 bg-white/60 backdrop-blur rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-3">
              Get Started in 3 Simple Steps
            </h3>
            <p className="text-gray-600 text-lg">
              Join thousands of traders in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10" />

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl shadow-blue-500/50 transform hover:scale-110 transition-transform">
                1
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">Create Account</h4>
              <p className="text-gray-600 leading-relaxed">
                Sign up with your email address and choose your preferred trading role -
                Buyer or Seller. Takes less than 60 seconds.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl shadow-green-500/50 transform hover:scale-110 transition-transform">
                2
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">Verify Email</h4>
              <p className="text-gray-600 leading-relaxed">
                Enter the 6-digit verification code sent to your inbox.
                Instant verification ensures account security.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">Start Trading</h4>
              <p className="text-gray-600 leading-relaxed">
                Access your dashboard, manage multiple wallets,
                and begin trading cryptocurrencies securely.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-none shadow-2xl">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-4xl font-bold mb-4">Ready to Start Trading?</h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of verified traders on the most secure OTC platform.
                Create your free account today and start trading in minutes.
              </p>
              <Link href="/register">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-blue-200 text-sm mt-4">
                No credit card required • Free forever • 2-minute setup
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-slate-900 mt-32 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">OTC Platform</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Secure peer-to-peer cryptocurrency trading with verified users.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/register" className="hover:text-blue-400 transition">Register</Link></li>
                <li><Link href="/login" className="hover:text-blue-400 transition">Sign In</Link></li>
                <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 OTC Platform. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-gray-400 text-sm">Secure Trading Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
