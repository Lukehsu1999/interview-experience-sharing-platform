'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  HeartIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { addLike } from '@/app/lib/actions';

export default function Display({ post }: { post: PostsTable }) {
  console.log(post.content);
  {/* parse content into lines */}
  const contentLines = post.content.split('+');
  console.log(contentLines);

  //create a on click
  const addLikeEvent = () => {
    console.log("clicked");
    addLike(post.id, post.creator_id, '410544b2-4001-4271-9855-fec4b6a6442a');
  }

  return (
    <div>
      <h2>{post.title}</h2>
      {/* {contentLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))} */}
      <textarea
        value={post.content}>
      </textarea>
      <p>Creator: {post.name}</p>
      <p>Email: {post.email}</p>
      <p>Company: {post.company}</p>
      <p>Creation Date: {formatDateToLocal(post.creation_date)}</p>
      <p>Interview Status: {post.interview_status}</p>
      <p>Interview Type: {post.interview_type}</p>
      <p>Likes: {post.likes}</p>
      <p>Views: {post.views}</p>
      <LikeButton clickevent={addLikeEvent}/>
    </div>
  );
}

function LikeButton({ clickevent }: { clickevent: () => void }) {
  return (
      <Button className="mt-4 w-50" onClick={clickevent}>
        <HeartIcon className="ml-auto h-5 w-5 text-gray-50" />Like
      </Button>
  );
}
