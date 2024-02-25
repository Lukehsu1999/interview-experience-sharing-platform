import Pagination from '@/app/ui/posts/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/posts/table';
import { CreatePost } from '@/app/ui/posts/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchUserIdByNameEmail, fetchPostsPages, fetchUnlimitedViewStatus } from '@/app/lib/data';
import { auth, signIn } from '@/auth';
import PlatformCardWrapper  from '@/app/ui/posts/platformStatsCards';
import{ CardsSkeleton } from '@/app/ui/skeletons';

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
  const userId = await fetchUserIdByNameEmail(String(userName), String(userEmail));

  // view block feature
  const unlimitedView = await fetchUnlimitedViewStatus(userId);
  // get query params
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Welcome to Miumee, {userName} <br></br>
        Share your experience in 🗣️ interview, 💼 work, 🏫 research, and 👩‍🔬school admission<br></br>
        All posts are anonymous now, but you can view your posts in Profile & Points</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search posts by Company, Title, Status, Type..." />
        <CreatePost />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} viewer_id={userId} unlimitedView={unlimitedView}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <PlatformCardWrapper />
        </Suspense>
      </div>
    </div>
  );
}
