'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { addLike } from '@/app/lib/actions';
import { useState } from 'react';

export default function Display({ post }: { post: PostsTable }) {
  console.log(post.content);
  {
    /* parse content into lines */
  }
  const contentLines = post.content.split('+');
  console.log(contentLines);
  const [liked, setLiked] = useState(false);

  //create a on click
  const addLikeEvent = async () => {
    try {
      console.log('clicked');
      const res = await addLike(
        post.id,
        post.creator_id,
        '410544b2-4001-4271-9855-fec4b6a6442a',
      );
      console.log(res);
      setLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      {/* {contentLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))} */}
      <textarea value={post.content}></textarea>
      <p>Creator: {post.name}</p>
      <p>Email: {post.email}</p>
      <p>Company: {post.company}</p>
      <p>Creation Date: {formatDateToLocal(post.creation_date)}</p>
      <p>Interview Status: {post.interview_status}</p>
      <p>Interview Type: {post.interview_type}</p>
      <p>Likes: {post.likes}</p>
      <p>Views: {post.views}</p>
      <LikeButton clickevent={addLikeEvent} liked_status={liked}/>
    </div>
  );
}

function LikeButton({ clickevent, liked_status }: { clickevent: () => void; liked_status: boolean }) {
  if (liked_status) {
    return null;
  }
  return (
    <Button className="w-50 mt-4" onClick={clickevent}>
      <HeartIcon className="ml-auto h-5 w-5 text-gray-50" />
      Like
    </Button>
  );
}
