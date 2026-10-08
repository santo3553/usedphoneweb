import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SWISH | Certified Used & Refurbished Smartphones',
  description: 'Certified pre-owned smartphones inspected with 100% real serialized photography and 50-point diagnostic certification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ background: '#000', color: '#fff' }}
        className="min-h-screen bg-black text-white antialiased selection:bg-zinc-700 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
