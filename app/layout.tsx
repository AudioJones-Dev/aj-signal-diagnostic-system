import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Signal Diagnostic | Audio Jones',
  description:
    'Stop solving the wrong problem. Diagnose exactly where your business is blocked with the Audio Jones Signal Diagnostic System.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-[#f5f5f5] min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
