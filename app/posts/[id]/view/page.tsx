import Display from '@/app/ui/posts/post-display';
import { CommentSection } from '@/app/ui/posts/commentSection';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUserIdByNameEmail, fetchPostById, fetchLikeStatus, fetchMeetStatus } from '@/app/lib/data';
import { auth, signIn } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
  // get user id
  const user = await auth();
  const userName = user?.user?.name;
  const userEmail = user?.user?.email;
  if (userName === undefined || userEmail === undefined) {
    signIn();
  }
  const userId = await fetchUserIdByNameEmail(
    String(userName), 
    String(userEmail),
  );

  // get post id
  const id = params.id;
  const post = await fetchPostById(id);

  // get like status
  const likeStatusRes = await fetchLikeStatus(id, userId);
  var likeStatus = false;
  if (likeStatusRes == 1) {
    likeStatus = true;
  } else {
    likeStatus = false;
  }
  //get meet status
  const meetStatusRes = await fetchMeetStatus(id, userId);
  var meetStatus = false;
  if (meetStatusRes == 1) {
    meetStatus = true;
  } else {
    meetStatus = false;
  }


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/posts' },
          {
            label: 'View Post',
            href: `/posts/${id}/view`,
            active: true,
          },
        ]}
      />
      <Display post={post} userId={userId} userName={String(userName)} userEmail={String(userEmail)} likeStatus={likeStatus} invitedStatus={meetStatus}/>
      <CommentSection post_id={id} />
    </main>
  );
}
