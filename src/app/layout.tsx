import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';
import Header from '@/components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Comment :: Forum',
  description: 'In loving memory of Doug Smart',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="container mx-auto px-4 max-w-6xl">
            <Header />
            <main>{children}</main>
            <footer>Footer</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
