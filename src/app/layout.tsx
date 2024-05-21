import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';

import './globals.css';

const kanit = Kanit({
  subsets: ['thai'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'ฐานข้อมูลหนัง | Cinematic Database',
  description: 'A database of movies and TV shows API by TMDb.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
