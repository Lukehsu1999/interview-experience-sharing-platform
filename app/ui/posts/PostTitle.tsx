'use client';

import Link from 'next/link';
import { addView } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export function PostTitle({
  post_id,
  creator_id,
  title,
  company,
  name,
  creation_date,
  unlimitedView,
  viewer_id,
}: {
  post_id: string;
  creator_id: string;
  title: string;
  creation_date: string;
  company: string;
  name: string;
  viewer_id: string;
  unlimitedView: boolean;
}) {
  const router = useRouter();

  const handleTitleClick = async () => {
    try {
      if (unlimitedView) {
        console.log('Navigating to post view');
        await addView(post_id, creator_id, viewer_id);
        router.push(`/posts/${post_id}/view`);
      } else {
        console.log('Redirecting to post creation for unlimited view');
        router.push(`/posts/create`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleTitleClick}>
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        style={{ fontSize: '0.75em' }}
      >
        {name} · {company} · {new Date(creation_date).toLocaleDateString()}
      </Typography>
      <Typography
        gutterBottom
        variant="h6"
        component="h3"
        style={{ fontWeight: 'bold' }}
      >
        {title}
      </Typography>
    </div>
  );
}
