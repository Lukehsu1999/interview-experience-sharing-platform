import Image from 'next/image';
import { ViewPostButton } from '@/app/ui/posts/viewPostButton';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPosts } from '@/app/lib/data';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
    <div className="mt-6 overflow-x-auto">
      <TableContainer
        component={Paper}
        className="rounded-lg bg-gray-50 p-2 md:pt-0"
      >
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ height: '56px' }}>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Company
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Unique Views
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Likes
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell
                  style={{
                    maxWidth: 160,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.company}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: 160,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.title}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                >
                  {post.interview_status}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                >
                  {post.interview_type}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                >
                  {post.views}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                >
                  {post.likes}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                >
                  <ViewPostButton
                    post_id={post.id}
                    creator_id={post.creator_id}
                    viewer_id={viewer_id}
                    unlimitedView={unlimitedView}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
