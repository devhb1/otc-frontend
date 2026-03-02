'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service in production
        if (process.env.NODE_ENV === 'production') {
            // TODO: Send to error tracking service (e.g., Sentry)
            console.error('Error caught by boundary:', error, errorInfo);
        } else {
            console.error('Error caught by boundary:', error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return (
                    <FallbackComponent
                        error={this.state.error!}
                        reset={this.handleReset}
                    />
                );
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
                    <div className="max-w-md w-full">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Something went wrong</AlertTitle>
                            <AlertDescription className="mt-2">
                                {process.env.NODE_ENV === 'development' ? (
                                    <div className="space-y-2">
                                        <p className="font-mono text-sm">
                                            {this.state.error?.message}
                                        </p>
                                        <pre className="text-xs overflow-auto max-h-48 bg-black/5 p-2 rounded">
                                            {this.state.error?.stack}
                                        </pre>
                                    </div>
                                ) : (
                                    <p>An unexpected error occurred. Please try again.</p>
                                )}
                            </AlertDescription>
                        </Alert>
                        <div className="mt-4 flex gap-2">
                            <Button onClick={this.handleReset} className="flex-1">
                                Try again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => (window.location.href = '/')}
                                className="flex-1"
                            >
                                Go home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Functional wrapper for easier use
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: React.ComponentType<{ error: Error; reset: () => void }>
) {
    return function WithErrorBoundary(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
