'use client';
import { Comment } from '@/app/lib/definitions';
import React, { useState, useEffect, useRef } from 'react';
import { createComment } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { formatDateToLocal } from '@/app/lib/utils';
import Swal from 'sweetalert2';

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
  const contentEditableRef = useRef<HTMLDivElement>(null);
  // Add a useEffect to clear the textarea content after the state is updated
  useEffect(() => {
    // Check if the newComment state is empty
    if (!newComment && textareaRef.current) {
      // Clear the textarea content
      textareaRef.current.value = '';
      // Adjust the textarea height (if needed)
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  const handleContentChange = () => {
    if (contentEditableRef.current) {
      setNewComment(contentEditableRef.current.innerText);
    }
  };

  const swalColors = {
    confirmButtonColor: '#036E7A',
    cancelButtonColor: '#9ECB1C', 
  };

  const addCommentEvent = async () => {
    // Use SweetAlert2 for a prettier confirmation dialog
    Swal.fire({
      text: "Are you ready to post?",
      showCancelButton: true,
      confirmButtonColor: swalColors.confirmButtonColor,
      cancelButtonColor: swalColors.cancelButtonColor,
      confirmButtonText: 'Yes, post it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('Adding new comment:', newComment);
          const res = await createComment(post_id, user_id, newComment.trim());
          if (contentEditableRef.current) {
            contentEditableRef.current.innerText = '';
          }
          setNewComment(''); 
          Swal.fire(
            'Posted!',
            'Your comment has been posted.',
            'success'
          )
        } catch (err) {
          console.log(err);
          Swal.fire(
            'Failed!',
            'Your comment could not be posted.',
            'error'
          )
        }
      } else {
        console.log('Comment post canceled by the user.');
      }
    });
  };
  

  return (
    <div
      className="mb-4 rounded-lg bg-white p-6 shadow-lg"
      style={{ borderColor: '#f3f4f6', borderWidth: '1px' }}
    >
      <h2 className="mb-4 text-2xl font-bold text-miumee-color-500">
        Comments
      </h2>

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
            <tr
              key={comment.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap px-3 py-3">{comment.content}</td>
              <td className="whitespace-nowrap px-3 py-3">
                {formatDateToLocal(comment.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex items-center gap-2">
        <div
          ref={contentEditableRef}
          contentEditable
          onInput={handleContentChange}
          className="w-full rounded-md border border-gray-300 p-2 placeholder:text-gray-500"
          style={{ minHeight: '50px', outline: 'none', cursor: 'text' }}
          placeholder="Add a comment or question here"
          role="textbox" 
          aria-multiline="true"
        ></div>
        <button
          className="rounded-md bg-miumee-color-400 px-2 py-1 text-sm text-white transition-colors duration-150 ease-in-out hover:bg-miumee-color-500"
          onClick={addCommentEvent}
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
