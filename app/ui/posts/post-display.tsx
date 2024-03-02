'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPost } from '@/app/lib/actions';
import { PostsTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { addLike, addMeet } from '@/app/lib/actions';
import { useState, useEffect, useRef } from 'react';

interface DisplayProps {
  post: PostsTable;
  userId: string;
  userEmail: string;
  likeStatus: boolean;
  invitedStatus: boolean;
}

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
  {
    /* parse content into lines */
  }
  // console.log(contentLines);
  // console.log(
  //   'user id: ',
  //   userId,
  //   ' user name: ',
  //   userName,
  //   ' user email: ',
  //   userEmail,
  // );
  // console.log('display like status: ' + likeStatus);

  // For zoe :
  const zoePostId = '42b51cae-b462-422b-96a1-589a36ad5f68';
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

  const handleContentChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    if (!readOnly) {
      setContent(event.target.innerText);
    }
  };
  const [readOnly, setReadOnly] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null); //ref for the content div
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
        'pending',
        'unpaid',
      ); //sequence wrong!
      console.log(res);
      setInvited(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-miumee-color-500">
          {post.title}
        </h2>

        <div className="flex items-center space-x-4 rounded-md bg-gray-100 p-2">
          <div className="flex items-center">
            <HeartIcon className="h-6 w-6 text-miumee-color-500" />
            <span className="ml-1 text-sm font-semibold text-gray-800">
              Likes:
            </span>
            <span className="ml-1 text-sm text-miumee-color-600">
              {post.likes}
            </span>
          </div>

          <div className="flex items-center">
            <EyeIcon className="h-6 w-6 text-miumee-color-500" />
            <span className="ml-1 text-sm font-semibold text-gray-800">
              Views:
            </span>
            <span className="ml-1 text-sm text-miumee-color-600">
              {post.views}
            </span>
          </div>
        </div>
      </div>

      <hr className="my-2 w-full border-gray-200" />

      <div className="mt-4 flex w-full items-center justify-between">
        <div className="flex items-center">
          <BriefcaseIcon className="mr-2 h-6 w-6 text-miumeeblue-500" />
          <div>
            <p className="font-semibold">Company</p>
            <p className="text-sm text-gray-600">{post.company}</p>
          </div>
        </div>

        <div className="flex items-center">
          <CheckCircleIcon className="mr-2 h-6 w-6 text-miumeeblue-500" />
          <div>
            <p className="font-semibold">Status</p>
            <p className="text-sm text-gray-600">{post.interview_status}</p>
          </div>
        </div>

        <div className="flex items-center">
          <DocumentTextIcon className="mr-2 h-6 w-6 text-miumeeblue-500" />
          <div>
            <p className="font-semibold">Type</p>
            <p className="text-sm text-gray-600">{post.interview_type}</p>
          </div>
        </div>
      </div>

      <hr className="mt-4 w-full border-gray-200" />

      <div
        ref={contentRef}
        contentEditable={false}
        suppressContentEditableWarning={true}
        className="p-4 text-gray-800"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {content}
      </div>

      <div className="mt-4 flex flex-wrap justify-between text-gray-800">
        {post.meet_able && (
          <div className="mt-4 flex flex-wrap items-center justify-between text-gray-800">
            <div className="flex w-full items-center md:w-1/2">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Meeting Charge:
                </p>
                <p className="text-sm text-gray-500">
                  {post.meet_charge} USD for 20 minutes
                </p>
              </div>
            </div>

            <div className="flex w-full items-center md:w-1/2">
              <div className="whitespace-nowrap">
                <p className="text-sm font-semibold text-gray-600">
                  Available Time:
                </p>
                <p className="text-sm text-gray-500">{post.available_time}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MeetButton clickevent={addMeetEvent} invited_status={invited} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <LikeButton clickevent={addLikeEvent} liked_status={liked} />
      </div>
      {post.id == zoePostId && (
        <div className="text-md text-blue-500">
          Got follow-up questions? <br></br>
          Buy this creator a coffee ☕ 🥐 to be added to her GroupMe group.{' '}
          <br></br>
          Please Zelle 508-902-8020 seven dollars with your GroupMe number in
          comment and you will be added to the group within 24 hours
        </div>
      )}
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
  // Use the color from the Tailwind config
  const bgColor = liked_status ? 'bg-miumeeblue-500' : 'bg-highlightgreen-100';
  const hoverColor = liked_status
    ? 'hover:bg-miumeeblue-600'
    : 'hover:bg-highlightgreen-200';

  return (
    <Button
      className={`w-50 mt-4 ${bgColor} ${hoverColor} justify-center`}
      onClick={clickevent}
      disabled={liked_status}
    >
      <HeartIcon className="ml-auto h-5 w-5 text-gray-50 mr-2" />
      {liked_status ? 'Liked!' : 'Like'}
    </Button>
  );
}

function MeetButton({
  clickevent,
  invited_status,
}: {
  clickevent: () => void;
  invited_status: boolean;
}) {
  // Use the color from the Tailwind config
  const bgColor = invited_status
    ? 'bg-miumeeblue-500'
    : 'bg-highlightgreen-100';
  const hoverColor = invited_status
    ? 'hover:bg-miumeeblue-600'
    : 'hover:bg-highlightgreen-200';

  return (
    <Button
      className={`w-50 mt-4 ${bgColor} ${hoverColor} justify-center`}
      onClick={clickevent}
      disabled={invited_status}
    >
      <HeartIcon className="ml-auto h-5 w-5 text-gray-50 mr-2" />
      {invited_status
        ? 'Invited! We will connect you and the content creator through Email'
        : 'Invite to Meet'}
    </Button>
  );
}
