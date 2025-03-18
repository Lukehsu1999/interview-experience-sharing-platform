import '@/app/ui/global.css';
import getServerSession from 'next-auth';
import { auth } from '@/auth';
import GoogleAnalytics from './ui/google-analytics';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics></GoogleAnalytics>
      <body>{children}</body>
    </html>
  );
}
