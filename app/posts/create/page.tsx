import Form from '@/app/ui/posts/create-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
import { fetchUserIdByNameEmail } from '@/app/lib/data';
import { auth, signIn } from '@/auth';

export default async function Page() {
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
  console.log("getting user id from create page: " + userId, "userId type: ", typeof userId);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/posts' },
          {
            label: 'Create Post',
            href: '/posts/create',
            active: true,
          },
        ]}
      />
      <Form userId={userId}/>
    </main>
  );
}
