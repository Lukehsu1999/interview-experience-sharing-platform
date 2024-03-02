'use client';
import { Comment } from '@/app/lib/definitions';

export function CommentSection({
  post_id,
  comments,
}: {
  post_id: string;
  comments: Comment[];
}) {
  return (
    <div>
      <h1>This is the comment section.</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          {/* Render other comment details if needed */}
        </div>
      ))}
    </div>
  );
}
