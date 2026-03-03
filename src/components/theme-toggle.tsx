'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/theme';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
