'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { addLike, addMeet } from '@/app/lib/actions';
import { useState, useEffect, useRef } from 'react';

export default function Display({
  post,
  userId,
  userName,
  userEmail,
  likeStatus,
  invitedStatus,
}: {
  post: PostsTable;
  userId: string;
  userName: string;
  userEmail: string;
  likeStatus: boolean;
  invitedStatus: boolean;
}) {
  console.log(post.content);
  {
    /* parse content into lines */
  }
  const contentLines = post.content.split('+');
  console.log(contentLines);
  console.log(
    'user id: ',
    userId,
    ' user name: ',
    userName,
    ' user email: ',
    userEmail,
  );
  console.log('display like status: ' + likeStatus);
  const [liked, setLiked] = useState(likeStatus);
  const [invited, setInvited] = useState(invitedStatus);
  const [content, setContent] = useState(post.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  //create a on click
  const addLikeEvent = async () => {
    try {
      console.log('clicked');
      const res = await addLike(post.id, post.creator_id, userId);
      console.log(res);
      setLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const addMeetEvent = async () => {
    try {
      console.log('clicked');
      const res = await addMeet(
        post.id,
        userId,
        userName,
        userEmail,
        post.creator_id,
        post.name,
        post.email,
        post.meet_charge,
        0,
        'Pending',
        'Unpaid',
      ); //sequence wrong!
      console.log(res);
      setInvited(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">{post.title}</h2>
      <textarea
        id="content"
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        className="w-full rounded-md border border-gray-300 p-2"
        style={{ overflowY: 'hidden' }} // Prevent scrollbar from appearing
        readOnly
      ></textarea>
      <p className="text-gray-600">
        Company: <span className="text-gray-800">{post.company}</span>
      </p>
      <div className="grid grid-cols-2">
        <p className="text-gray-600">
          Status:{' '}
          <span className="text-gray-800">{post.interview_status}</span>
        </p>
        <p className="text-gray-600">
          Type:{' '}
          <span className="text-gray-800">{post.interview_type}</span>
        </p>
      </div>
      {/* still using the old likes and views 
      <div className="grid grid-cols-2">
        <p className="text-gray-600">
          Likes: <span className="text-gray-800">{post.likes}</span>
        </p>
        <p className="text-gray-600">
          Unique Views: <span className="text-gray-800">{post.views}</span>
        </p>
      </div> */}

      {post.meet_able ? (
        <div className="mt-4">
          <div className="grid grid-cols-2">
          <p className="text-gray-600">
            Meeting Charge:{' '}
            <span className="text-gray-800">{post.meet_charge}</span> 
            {/* (an additional 10% platform fee will be charged) */}
             USD for 20 minutes
          </p>
          <p className="text-gray-600">
            Available Time:{' '}
            <span className="text-gray-800">{post.available_time}</span>
          </p>
          </div>
          <MeetButton clickevent={addMeetEvent} invited_status={invited} />
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-600">
            Meet Charge: <span className="text-gray-800">Not Available</span>
          </p>
          <p className="text-gray-600">
            Available Time: <span className="text-gray-800">Not Available</span>
          </p>
        </div>
      )}
      <div className="mt-4">
        <LikeButton clickevent={addLikeEvent} liked_status={liked} />
      </div>
    </div>
  );
}

function LikeButton({
  clickevent,
  liked_status,
}: {
  clickevent: () => void;
  liked_status: boolean;
}) {
  if (liked_status) {
    return (
      <Button
        className="w-50 mt-4 bg-green-500 hover:bg-green-500"
        disabled={true}
      >
        Liked!
      </Button>
    );
  } else {
    return (
      <Button className="w-50 mt-4" onClick={clickevent}>
        <HeartIcon className="ml-auto h-5 w-5 text-gray-50" />
        Like
      </Button>
    );
  }
}

function MeetButton({
  clickevent,
  invited_status,
}: {
  clickevent: () => void;
  invited_status: boolean;
}) {
  if (invited_status) {
    return (
      <Button
        className="w-50 mt-4 bg-green-500 hover:bg-green-500 justify-center"
        disabled={true}
      >
        Invited!
      </Button>
    );
  } else {
    return (
      <Button className="w-50 mt-4 justify-center" onClick={clickevent}>
        <HeartIcon className="ml-auto h-5 w-5 text-gray-50" />
        Invite to Meet
      </Button>
    );
  }
}
