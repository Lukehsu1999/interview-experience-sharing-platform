'use client';
import { Comment } from '@/app/lib/definitions';
import React, { useState, useEffect, useRef } from 'react';
import { createComment } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { formatDateToLocal } from '@/app/lib/utils';

export function CommentSection({
  post_id,
  comments,
  user_id,
}: {
  post_id: string;
  comments: Comment[];
  user_id: string;
}) {
  const [newComment, setNewComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewComment(event.target.value);
  };

  const addCommentEvent = async () => {
    try {
      console.log('Adding new comment:', newComment);
      const res = await createComment(post_id, user_id, newComment);
      setNewComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Comments</h2>

      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Date
                </th>
            </tr>
        </thead>
        <tbody className="bg-white">
          {comments.map((comment) => (
            <tr key={comment.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <td className="whitespace-nowrap px-3 py-3">{comment.content}</td>
              <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(comment.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="mt-2 flex items-center gap-2">
          <textarea
            ref={textareaRef}
            placeholder="Add a comment or question here"
            onChange={handleContentChange}
            className="w-full rounded-md border border-gray-300 p-2 placeholder:text-gray-500"
          ></textarea>
          <button
            className="rounded-md bg-miumee-color-400 px-4 py-2 text-white"
            onClick={addCommentEvent}
          >
            Add Commment
          </button>
        </div>
      </div>
    </div>
  );
}
