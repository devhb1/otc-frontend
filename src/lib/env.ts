/**
 * Environment validation utilities
 * Ensures all required environment variables are set
 */

interface EnvConfig {
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
}

class EnvValidator {
    private errors: string[] = [];

    validateRequired(key: string, value: string | undefined): string {
        if (!value) {
            this.errors.push(`Missing required environment variable: ${key}`);
            return '';
        }
        return value;
    }

    validateUrl(key: string, value: string | undefined): string {
        const validated = this.validateRequired(key, value);
        if (validated && !validated.startsWith('http')) {
            this.errors.push(`${key} must be a valid URL starting with http:// or https://`);
        }
        return validated;
    }

    validate(): EnvConfig {
        const config: EnvConfig = {
            NEXT_PUBLIC_API_URL: this.validateUrl(
                'NEXT_PUBLIC_API_URL',
                process.env.NEXT_PUBLIC_API_URL
            ),
            NODE_ENV: (process.env.NODE_ENV || 'development') as EnvConfig['NODE_ENV'],
        };

        if (this.errors.length > 0) {
            const errorMessage = [
                '❌ Environment validation failed:',
                ...this.errors.map(err => `  - ${err}`),
                '\nPlease check your .env.local file and ensure all required variables are set.',
            ].join('\n');

            if (process.env.NODE_ENV === 'production') {
                throw new Error(errorMessage);
            } else {
                console.error(errorMessage);
            }
        }

        return config;
    }

    getErrors(): string[] {
        return this.errors;
    }
}

// Validate on module load (both server and client)
const validator = new EnvValidator();
const env = validator.validate();

// Additional runtime checks for production
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    // Server-side production checks
    if (!process.env.NEXT_PUBLIC_API_URL?.startsWith('https://')) {
        console.warn('⚠️  WARNING: NEXT_PUBLIC_API_URL should use HTTPS in production');
    }
}

export { env };
export type { EnvConfig };
