import '@/app/ui/global.css';
import getServerSession from 'next-auth';
import { auth } from '@/auth';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
