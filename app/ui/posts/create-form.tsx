'use client';

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
import { useState, useEffect, useRef } from 'react';
interface FormProps {
  userId: string;
}

export default function Form({ userId }: FormProps) {
  // console.log('Form userId: ', userId, 'userId type: ', typeof userId);
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current){
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  return (
    <form action={createPost}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* put input here*/}
        {/* Enter creator_id, will be hidden later */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="mb-2 block hidden text-sm font-medium"
          >
            (hidden) Enter creator id, hidden later
          </label>
          <div className="relative mt-2 hidden rounded-md">
            <div className="relative">
              <input
                id="creator_id"
                name="creator_id"
                type="text"
                placeholder="Enter your id here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={userId}
              />
            </div>
          </div>
        </div>
        {/* Enter Company */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter company name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Enter the company name here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* title */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Post title here
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="title"
                placeholder="Enter Post title here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Select interview status */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Select an interview/work status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="interview_status"
                name="interview_status"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Phone interview">Phone interview</option>
                <option value="Online Assessment">Online Assessment</option>
                <option value="First Round">First Round</option>
                <option value="Second Round">Second Round</option>
                <option value="Third Round">Third Round</option>
                <option value="Final Round">Final Round</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
        {/* Interview Type */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Select an interview/work type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="interview_type"
                name="interview_type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              >
                <option value="Work">Work</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Behavioral Interview">
                  Behavioral Interview
                </option>
                <option value="Case Interview">Case Interview</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
        {/* Post Content */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Post Content. We encourage you to type it somewhere and paste it here.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                ref={textareaRef}
                placeholder="Share your experience here~"
                onChange={handleContentChange}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-gray-500"
                style={{ minHeight: '150px' }}
              ></textarea>
            </div>
          </div>
        </div>
        {/* select true or false for meet_able*/}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Are you open for other people to reach out to you for a paid 20 mins
            meeting call?
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="meet_able"
                name="meet_able"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
        {/* enter an integer amount of usd dollar for meet_charge*/}
        {/* enter an integer amount of usd dollar for meet_charge*/}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            If yes, how much would you charge for a 20 mins meeting call? (In
            USD)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="meet_charge"
                name="meet_charge"
                type="number"
                min="0"
                placeholder="Enter an integer amount of usd dollar for meet_charge"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* text input for available time */}
        <div className="mt-6">
          <label
            htmlFor="available_time"
            className="mb-2 block text-sm font-medium"
          >
            If yes, when are you usually available to meet?
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="available_time"
                name="available_time"
                type="text"
                placeholder="Enter your available time here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/posts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Posts</Button>
      </div>
    </form>
  );
}
