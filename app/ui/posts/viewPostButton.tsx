'use client';

import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { addView } from '@/app/lib/actions';
import { useRouter } from 'next/navigation'

export function ViewPostButton({ post_id, creator_id, viewer_id }: { post_id: string; creator_id: string; viewer_id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        try {
          console.log('viewed');
          const res = await addView(post_id, creator_id, viewer_id);
          console.log(res);
          router.push(`/posts/${post_id}/view`);
        } catch (err) {
          console.log(err);
        }
      }}
      // href={`/posts/${post_id}/view`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <EyeIcon className="w-5" /> <span className="hidden md:block">View</span>
    </button>
  );
}
