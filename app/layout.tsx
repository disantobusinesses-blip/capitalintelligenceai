import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import GrainOverlay from '@/components/grain-overlay';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Capital Intelligence Group - Premium Websites, Intelligently Built',
  description: 'Australian-based premium web development studio creating high-end, conversion-focused websites with AI integration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <GrainOverlay />
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
            success: {
              iconTheme: {
                primary: 'hsl(var(--accent))',
                secondary: 'hsl(var(--background))',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
