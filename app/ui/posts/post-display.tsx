'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { addLike, addMeet } from '@/app/lib/actions';
import { useState } from 'react';

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
  console.log("user id: ", userId, " user name: ", userName, " user email: ", userEmail);
  console.log('display like status: ' + likeStatus);
  const [liked, setLiked] = useState(likeStatus);
  const [invited, setInvited] = useState(invitedStatus);

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
      const res = await addMeet(post.id, userId, userName, userEmail, post.creator_id, post.name, post.email, post.meet_charge, 0, "Pending", "Unpaid");//sequence wrong!
      console.log(res);
      setInvited(true);
    } catch (err) {
      console.log(err);
    }
  }

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
      {/* if post.meet_able is true, show the meet_charge and available_time */}  
      {post.meet_able && (
        <div>
          <p>Meeting Charge: {post.meet_charge} (an addition 10% platform fee will be charged)</p>
          <p>Available Time: {post.available_time}</p>
          <MeetButton clickevent={addMeetEvent} invited_status={invited}/>
        </div>
      )}
      {/* if post.meet_able is false, show the meet_charge and available_time */}  
      {!post.meet_able && (
        <div>
          <p>Meet Charge: Not Available</p>
          <p>Available Time: Not Available</p>
        </div>
      )}
      <LikeButton clickevent={addLikeEvent} liked_status={liked} />
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
      <Button className="w-50 mt-4 bg-green-500 hover:bg-green-500" disabled={true}>
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
      <Button className="w-50 mt-4 bg-green-500 hover:bg-green-500" disabled={true}>
        Invited!
      </Button>
    );
  } else {
    return (
      <Button className="w-50 mt-4" onClick={clickevent}>
        <HeartIcon className="ml-auto h-5 w-5 text-gray-50" />
        Invite to Meet
      </Button>
    );
  }
}