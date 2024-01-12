import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Display({ post }: { post: PostsTable }) {
  console.log(post.content);
  {/* parse content into lines */}
  const contentLines = post.content.split('+');
  console.log(contentLines);
  return (
    <div>
      <h2>{post.title}</h2>
      {contentLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <p>Creator: {post.name}</p>
      <p>Email: {post.email}</p>
      <p>Company: {post.company}</p>
      <p>Creation Date: {formatDateToLocal(post.creation_date)}</p>
      <p>Interview Status: {post.interview_status}</p>
      <p>Interview Type: {post.interview_type}</p>
      <p>Likes: {post.likes}</p>
      <p>Views: {post.views}</p>
    </div>
  );
}
