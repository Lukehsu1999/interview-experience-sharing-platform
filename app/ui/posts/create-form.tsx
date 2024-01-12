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

export default function Form() {
  return (
    <form action={createPost}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* put input here*/}
        {/* Enter creator_id, will be hidden later */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter creator id, hidden later
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="creator_id"
                name="creator_id"
                type="text"
                placeholder="Enter your id here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
            Select an interview status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="interview_status"
                name="interview_status"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              >
                <option value="Phone interview">Phone interview</option>
                <option value="Online Assessment">Online Assessment</option>
                <option value="First Round">First Round</option>
                <option value="Second Round">Second Round</option>
                <option value="Third Round">Third Round</option>
                <option value="Final Round">Final Round</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
        {/* Interview Type */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Select an interview type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="interview_type"
                name="interview_type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              >
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
            Enter Post Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Enter your content..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              ></textarea>
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
