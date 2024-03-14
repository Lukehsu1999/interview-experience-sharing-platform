import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { fetchFilteredPosts } from '@/app/lib/data';
import { PostTitle } from './PostTitle';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';

export default async function InvoicesTable({
  query,
  currentPage,
  viewer_id,
  unlimitedView,
}: {
  query: string;
  currentPage: number;
  viewer_id: string;
  unlimitedView: boolean;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);

  const statusColors = {
    'Full Time': 'bg-miumeeblue-500',
    'Part Time': 'bg-highlightgreen-300',
    Internship: 'bg-miumeeblue-400',
    'Phone interview': 'bg-miumee-color-500',
    'Online Assessment': 'bg-columbia-blue-400',
    'First Round': 'bg-highlightgreen-200',
    'Second Round': 'bg-highlightgreen-300',
    'Third Round': 'bg-miumee-color-600',
    'Final Round': 'bg-columbia-blue-400',
    Others: 'bg-gray-400',
  };

  const typeColors = {
    'School Admission': 'bg-miumeeblue-500',
    Research: 'bg-highlightgreen-300',
    Work: 'bg-miumeeblue-400',
    'Technical Interview': 'bg-miumee-color-500',
    'Behavioral Interview': 'bg-columbia-blue-400',
    'Case Interview': 'bg-highlightgreen-200',
    Others: 'bg-gray-400',
  };

  return (
    <div className="mt-6">
      {posts?.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardContent>
            <PostTitle
              post_id={post.id}
              creator_id={post.creator_id}
              title={post.title}
              company={post.company}
              name={post.name}
              creation_date={post.creation_date}
              unlimitedView={unlimitedView}
              viewer_id={viewer_id}
            />
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content.substring(0, 500)}
            </Typography>
            <div className="flex items-end justify-between">
              {' '}
              {/* Aligns the content to the bottom */}
              <div className="flex gap-2">
                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium text-white ${
                    statusColors[post.interview_status] || 'bg-gray-400'
                  }`}
                >
                  {post.interview_status}
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium text-white ${
                    typeColors[post.interview_type] || 'bg-gray-400'
                  }`}
                >
                  {post.interview_type}
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-3 p-2 text-xs">
                {' '}
                <div className="flex items-center">
                  <HeartIcon className="h-5 w-5 text-miumee-color-500" />{' '}
                  <span className="ml-1 font-semibold text-gray-700">
                    {' '}
                    {/* Slightly darker text for better readability */}
                    Likes:
                  </span>
                  <span className="ml-1 text-miumee-color-600">
                    {post.likes}
                  </span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="h-5 w-5 text-miumee-color-500" />{' '}
                  {/* Smaller icons */}
                  <span className="ml-1 font-semibold text-gray-700">
                    {' '}
                    {/* Slightly darker text for better readability */}
                    Views:
                  </span>
                  <span className="ml-1 text-miumee-color-600">
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
