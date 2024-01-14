import '@/app/ui/global.css';
import getServerSession from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { authConfig } from "@/auth.config";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      {/* <SessionProvider session={session}> */}
        <body>{children}</body>
      {/* </SessionProvider> */}
    </html>
  );
}
