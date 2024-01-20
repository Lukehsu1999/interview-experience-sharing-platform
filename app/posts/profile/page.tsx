import { fetchUserIdByNameEmail, fetchPostsPages } from '@/app/lib/data';
import { auth, signIn } from '@/auth';
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import {
  LatestInvoicesSkeleton,
  CardsSkeleton,
  InvoicesTableSkeleton,
} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import Table from '@/app/ui/dashboard/myposttable';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // get user id
  const user = await auth();
  const userName = user?.user?.name;
  const userEmail = user?.user?.email;
  if (userName === undefined || userEmail === undefined) {
    signIn();
  }
  const userId = await fetchUserIdByNameEmail(
    String(userName),
    String(userEmail),
  );

  // get query params
  const query = 'query='+userName;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(query);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper userId={userId} />
        </Suspense>
      </div>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Posts
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table query={userId} />
        </Suspense>
      </div>
    </main>
  );
}
