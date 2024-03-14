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
                  className={`rounded-full bg-miumeeblue-500 px-2 py-1 text-xs font-medium text-white`}
                >
                  {post.interview_status}
                </div>
                <div
                  className={`rounded-full bg-miumee-color-500 px-2 py-1 text-xs font-medium text-white`}
                >
                  {post.interview_type}
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 text-xs mt-2">
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
