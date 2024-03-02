'use client';
import { Comment } from '@/app/lib/definitions';
import React, { useState } from 'react';
import { createComment } from '@/app/lib/actions';
import { set } from 'zod';

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

  const addCommentEvent = async () => {
    try {
        console.log('Adding new comment:', newComment);
        const res = await createComment(post_id, user_id, newComment);
        setNewComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = () => {
    // Implement the logic to add a new comment, e.g., send to the server
    console.log('Adding new comment:', newComment);
    try {
        addCommentEvent();
      setNewComment('');
    } catch (e) {
      console.log('Error adding new comment:', e);
      console.error(e);
    }
  };
  return (
    <div>
      <h1>This is the comment section.</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          {/* Render other comment details if needed */}
        </div>
      ))}
      <div>
        <h2>Add a new comment</h2>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a new comment..."
        />
        <button onClick={addCommentEvent}>Add Comment</button>
      </div>
    </div>
  );
}
