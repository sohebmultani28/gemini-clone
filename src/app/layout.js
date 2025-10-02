'use client';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useThemeStore from '@/store/themeStore';
import './globals.css';

export default function RootLayout({ children }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <title>Gemini Clone - AI Chat Application</title>
        <meta name="description" content="A modern AI chat application" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              color: theme === 'dark' ? '#F9FAFB' : '#111827',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
            },
          }}
        />
      </body>
    </html>
  );
}