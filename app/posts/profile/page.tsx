import {
  fetchUserIdByNameEmail,
  fetchPostsPages,
  fetchUnlimitedViewStatus,
} from '@/app/lib/data';
import { auth, signIn } from '@/auth';
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { CreatePost } from '@/app/ui/posts/buttons';
import {
  LatestInvoicesSkeleton,
  CardsSkeleton,
  InvoicesTableSkeleton,
} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import Table from '@/app/ui/posts/myposttable';
import ResetPassword from '@/app/ui/posts/resetPassword';

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
  const unlimitedView = await fetchUnlimitedViewStatus(userId);
  // get query params
  const query = 'query=' + userName;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(query);
  const sectionClassname = "mb-8 p-4 rounded-lg shadow-md bg-gray-50";

  return (
    <main>
      <div className={sectionClassname}>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper userId={userId} />
          </Suspense>
        </div>
        <div
          className="h-15 flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {
            <>
              <p className="text-sm text-blue-500">
                {
                  '1 view = 1 point; 1 like = 5 points. In the future we hope to reward content creators for the sustainability of the website, for now, check out the Announcements page for the awards we can afford for now'
                }
              </p>
            </>
          }
        </div>
      </div>
      <div className={sectionClassname}>
        <h1 className={`${lusitana.className} mb-4 mt-4 text-xl md:text-2xl`}>
          My Posts
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            <Table query={userId} unlimitedView={true} />
          </Suspense>
        </div>
        <div className="mt-2 grid grid-cols-1">
          <CreatePost />
        </div>
      </div>
      <div className={sectionClassname}>
        <h1 className={`${lusitana.className} mb-4 mt-4 text-xl md:text-2xl`}>
          Reset Password
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <ResetPassword userId={userId} />
        </div>
      </div>
    </main>
  );
}
