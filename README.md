# 🎯 OTC Platform - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Production-ready frontend for the OTC (Over-The-Counter) Trading Platform MVP**

🚀 **Status**: Production Ready | ✅ Identity Module Complete

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Production Checklist](#-production-checklist)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Identity Module (MVP - Phase 1) ✅

- **User Registration** with email verification via OTP
- **Email Verification** with OTP code delivery
- **Login/Logout** with JWT authentication
- **Protected Routes** with automatic redirect
- **Token Refresh** with automatic retry mechanism
- **Role Selection** (Buyer/Seller) during registration
- **User Dashboard** with profile information
- **Role Switching** between Buyer and Seller

### Technical Features

- ⚡ **Next.js 16** with App Router and React Server Components
- 🎨 **TailwindCSS 4** with modern utility-first styling
- 🔐 **Secure Authentication** with JWT access and refresh tokens
- 🛡️ **Form Validation** matching backend requirements
- 🔄 **Auto Token Refresh** keeps users logged in seamlessly
- 📱 **Responsive Design** works on all devices
- 🚨 **Error Boundaries** with graceful error handling
- 🎯 **Type Safety** with full TypeScript coverage
- 🔒 **Security Headers** (CSP, HSTS, X-Frame-Options, etc.)
- ⚡ **Performance Optimized** (code splitting, lazy loading)

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 16.1.6 |
| **UI Library** | React | 19.2.3 |
| **Language** | TypeScript | 5.x |
| **Styling** | TailwindCSS | 4.x |
| **HTTP Client** | Axios | 1.13.5 |
| **State Management** | Zustand | 5.0.11 |
| **Icons** | Lucide React | 0.575.0 |
| **Deployment** | Vercel | Latest |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 8.x or higher
- **Backend running** (see `../otc-backend/README.md`)

### Local Development (5 Minutes)

```bash
# 1. Navigate to frontend directory
cd otc-frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Update .env.local with your backend URL (usually localhost:3001)
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# 5. Start development server
npm run dev

# 6. Open browser
open http://localhost:3000
```

### Production Deployment (5 Minutes)

See **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** for complete Vercel deployment guide.

**Quick Deploy**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-railway-app.up.railway.app
```

---

## 📁 Project Structure

```
otc-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Global styles
│   │   ├── register/          # Registration page
│   │   ├── verify-email/      # Email verification page
│   │   ├── login/             # Login page
│   │   └── dashboard/         # Protected dashboard
│   ├── components/            # Reusable components
│   │   ├── ErrorBoundary.tsx # Error handling
│   │   └── ui/               # UI components (buttons, cards, etc.)
│   ├── lib/                   # Utilities and configuration
│   │   ├── api.ts            # Axios client with interceptors
│   │   ├── env.ts            # Environment validation
│   │   └── utils.ts          # Helper functions
│   └── store/                 # State management
│       └── auth.ts           # Authentication store (Zustand)
├── public/                    # Static assets
├── .env.example              # Environment template
├── .env.local                # Local environment (git-ignored)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
├── VERCEL_DEPLOYMENT.md      # Deployment guide
├── PRODUCTION_READY.md       # Production audit report
└── PRODUCTION_CHECKLIST.md   # Pre-deployment checklist
```

---

## 🔐 Authentication Flow

### Complete Registration → Login Flow

```bash
# 1. Register new user
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "role": "BUYER"
}
# Response: { message: "User registered. Check email for OTP." }

# 2. Check email for 6-digit OTP (expires in 10 minutes)

# 3. Verify email with OTP
POST /api/v1/auth/verify-email
{
  "email": "user@example.com",
  "otp": "123456"
}
# Response: { message: "Email verified successfully" }

# 4. Login with verified credentials
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
# Response: { accessToken, refreshToken, user }

# 5. Access protected dashboard (automatic token refresh)
GET /api/v1/users/me
Authorization: Bearer <accessToken>
# Response: { id, email, role, isEmailVerified, ... }
```

### Token Management

- **Access Token**: Valid for 15 minutes, stored in localStorage
- **Refresh Token**: Valid for 7 days, stored in localStorage
- **Auto Refresh**: Automatic token refresh on 401 errors
- **Request Queue**: Failed requests automatically retried with new token

### Password Requirements

✅ Minimum 8 characters
✅ At least one uppercase letter (A-Z)
✅ At least one lowercase letter (a-z)
✅ At least one number (0-9)
✅ At least one special character (!@#$%^&*)

---

## 🌐 Deployment

### Vercel (Recommended)

**Complete guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

**Quick steps**:
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Set `NEXT_PUBLIC_API_URL` environment variable to your Railway backend URL
4. Deploy (automatic)
5. Update backend `FRONTEND_URL` in Railway to your Vercel URL

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- **Netlify**: Supports Next.js with serverless functions
- **AWS Amplify**: Full Next.js support
- **Cloudflare Pages**: Next.js runtime available
- **Self-hosted**: Use `npm run build && npm start`

---

## 🔧 Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://your-app.up.railway.app` |
| `NODE_ENV` | Environment mode | `production` |

### Optional

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |
| `NEXT_PUBLIC_ANALYTICS_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | `https://...@sentry.io/...` |

### Configuration Files

- **Development**: `.env.local` (git-ignored)
- **Production**: Set in Vercel dashboard (Settings → Environment Variables)
- **Template**: `.env.example` (committed to git)

---

## 💻 Development

### Available Scripts

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and test locally
npm run dev

# 3. Build and verify
npm run build
npm start

# 4. Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 5. Vercel creates preview deployment automatically
# Test on: https://otc-frontend-git-feature-new-feature.vercel.app

# 6. Merge to main for production deployment
```

### Code Style

This project uses:
- **ESLint**: Code linting with Next.js rules
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (recommended)

### Testing Locally

```bash
# 1. Ensure backend is running
curl http://localhost:3001/api/v1/health

# 2. Start frontend
npm run dev

# 3. Test registration flow
# - Visit http://localhost:3000/register
# - Register with email (check spam folder for OTP)
# - Verify email at /verify-email
# - Login at /login
# - Access dashboard at /dashboard

# 4. Test token refresh
# - Login and wait 15+ minutes
# - Navigate to dashboard
# - Token should auto-refresh without logout
```

---

## ✅ Production Checklist

Before deploying to production, verify:

### Code Quality
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint errors: `npm run lint`
- [ ] All imports resolved
- [ ] No console errors in browser

### Functionality
- [ ] Registration creates user
- [ ] OTP email delivers (check spam)
- [ ] Email verification works
- [ ] Login with verified credentials
- [ ] Dashboard loads user data
- [ ] Logout clears tokens
- [ ] Token refresh works (test after 15+ min)
- [ ] Protected routes redirect to login

### Configuration
- [ ] `NEXT_PUBLIC_API_URL` set to Railway backend URL
- [ ] Backend `FRONTEND_URL` updated to Vercel URL
- [ ] CORS configured on backend
- [ ] Environment variables in Vercel dashboard
- [ ] Same-site cookies configured (if using)

### Security
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers present (check network tab)
- [ ] No API keys in client code
- [ ] No sensitive data in localStorage
- [ ] CORS origin whitelisted on backend
- [ ] CSP headers configured

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Images optimized
- [ ] Code splitting working

**Complete checklist**: [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)

---

## 🐛 Troubleshooting

### Issue 1: CORS Error When Calling API

**Symptom**: Browser console shows "CORS policy blocked"

**Solution**:
1. Check backend `FRONTEND_URL` environment variable in Railway
2. Ensure it matches your Vercel deployment URL exactly
3. No trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`
4. Redeploy backend after changing env vars
5. Clear browser cache

### Issue 2: Environment Variable Not Found

**Symptom**: `NEXT_PUBLIC_API_URL is not defined` warning

**Solution**:
```bash
# Check .env.local exists
cat .env.local

# Should contain:
NEXT_PUBLIC_API_URL=http://localhost:3001

# Restart dev server after creating .env.local
npm run dev
```

For production, set in Vercel dashboard.

### Issue 3: Email Not Receiving OTP

**Symptom**: No OTP email after registration

**Solutions**:
1. **Check spam folder** - Gmail often filters automated emails
2. **Verify backend email config** - Check Railway logs for email errors
3. **Test backend directly**:
   ```bash
   curl -X POST https://your-railway-app.up.railway.app/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!","role":"BUYER"}'
   ```
4. **Check backend logs** in Railway dashboard
5. **Verify SMTP credentials** - Gmail App Password configured correctly

### Issue 4: Token Refresh Not Working

**Symptom**: Logged out after 15 minutes

**Solution**:
1. Check browser console for errors
2. Verify `localStorage.getItem('refreshToken')` exists
3. Test refresh endpoint:
   ```bash
   curl -X POST http://localhost:3001/api/v1/auth/refresh \
     -H "Content-Type: application/json" \
     -d '{"refreshToken":"your-refresh-token"}'
   ```
4. Check [src/lib/api.ts](src/lib/api.ts) interceptor logic
5. Clear localStorage and login again

### Issue 5: Build Fails on Vercel

**Symptom**: Deployment fails with build error

**Common Causes**:
1. **TypeScript errors**: Run `npm run build` locally first
2. **Missing dependencies**: Ensure all deps in `package.json`
3. **Node version**: Vercel uses Node 18+ (check locally with `node -v`)
4. **Environment variables**: Set `NEXT_PUBLIC_API_URL` in Vercel

**Debug**:
```bash
# Test build locally
npm run build

# Check for errors
npm run lint

# Verify Node version matches Vercel (18+)
node -v
```

### Issue 6: Protected Routes Not Redirecting

**Symptom**: Can access /dashboard without login

**Solution**:
1. Check [src/middleware.ts](src/middleware.ts) exists
2. Verify middleware matcher configuration
3. Clear browser cache and localStorage
4. Test in incognito mode
5. Check `accessToken` in localStorage is valid

---

## 📚 API Endpoints Used

All endpoints use base URL: `NEXT_PUBLIC_API_URL` (e.g., `https://your-app.up.railway.app`)

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/verify-email` | Verify email with OTP | No |
| POST | `/api/v1/auth/resend-otp` | Resend OTP code | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |

### Users (Protected)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users/me` | Get current user profile | Yes |
| PATCH | `/api/v1/users/switch-role` | Switch between BUYER/SELLER | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/health` | Backend health status | No |

---

## 🎯 Roadmap

### Phase 1: Identity Module ✅ (Current MVP)
- [x] User Registration
- [x] Email Verification (OTP)
- [x] Login/Logout
- [x] Protected Routes
- [x] Token Refresh
- [x] User Profile
- [x] Role Management

### Phase 2: Trading Module 🚧 (Next)
- [ ] Create OTC Ads
- [ ] Browse Ads
- [ ] Order Management
- [ ] Real-time Chat
- [ ] Escrow System

### Phase 3: Security & Compliance 📋 (Future)
- [ ] KYC Verification
- [ ] 2FA Authentication
- [ ] Audit Logs
- [ ] Dispute Resolution

### Phase 4: Advanced Features 🔮 (Future)
- [ ] Multi-currency Support
- [ ] Price Alerts
- [ ] Analytics Dashboard
- [ ] Mobile App (React Native)

---

## 🤝 Contributing

This is a private project for the OTC Platform MVP. For internal contributions:

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes with proper TypeScript types
3. Test locally: `npm run dev`
4. Build: `npm run build`
5. Commit: `git commit -m "Add feature"`
6. Push and create PR: `git push origin feature/new-feature`

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Support

- **Backend Docs**: `../otc-backend/README.md`
- **Deployment Guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- **Production Audit**: [PRODUCTION_READY.md](PRODUCTION_READY.md)
- **Checklist**: [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)

---

**Last Updated**: March 2, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready - MVP Phase 1 Complete

