import { PencilIcon, PlusIcon, TrashIcon, EyeIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-miumee-color-600 px-4 text-sm font-medium text-white transition-colors hover:bg-miumee-color-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-miumee-color-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreatePost() {
  return (
    <Link
      href="/posts/create"
      className="flex h-10 items-center justify-center rounded-lg bg-miumee-color-500 px-4 text-sm font-medium text-white transition-colors hover:bg-miumee-color-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-miumee-color-500"
    >
      <span className="">Create Post</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ViewPost({ id }: { id: string }) {
  return (
    <Link
      href={`/posts/${id}/view`}
      className="flex h-10 items-center rounded-lg bg-miumee-color-600 px-4 text-sm font-medium text-white transition-colors hover:bg-miumee-color-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-miumee-color-600"
    >
      <EyeIcon className="w-5" />{' '}
      <span className="hidden md:block">View</span>
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}

export function SortButtons({ currentSort }: { currentSort: string }){
  return (
    <div className="flex gap-2">
      <Link
        href={'?sort=hot&page=1'}
        scroll={false}
        className="flex h-10 items-center justify-center rounded-lg bg-miumee-color-500 px-4 text-sm font-medium text-white transition-colors hover:bg-miumee-color-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-miumee-color-500"
      >
        <FireIcon className="h-5 w-5 text-red-500 mr-2" />
        HOT
      </Link>
      <Link
        href={'?sort=new&page=1'} scroll={false}
        className="flex h-10 items-center justify-center rounded-lg bg-miumee-color-500 px-4 text-sm font-medium text-white transition-colors hover:bg-miumee-color-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-miumee-color-500"
      >
        <SparklesIcon className="h-5 w-5 text-yellow-400 mr-2" />
        NEW
      </Link>
    </div> 
  );
}
