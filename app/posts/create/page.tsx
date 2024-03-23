import Form from '@/app/ui/posts/create-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
import { fetchUnlimitedViewStatus, fetchUserIdByNameEmail, fetchAllTags } from '@/app/lib/data';
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
  const tags = await fetchAllTags();
  console.log('tags: ', tags);

  const unlimitedView = await fetchUnlimitedViewStatus(userId);
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
      {(!unlimitedView) &&
      <div><strong>
        Please create a new post to help other students ❤️, building a supportive community🤝! <br></br>
        We greatly appreciate your time and effort, you will have unlimited view access 👀 after creating the post. <br></br>
        We value your contribution and please checkout the Announcements for rewards💰!
      </strong></div>

      }
      <Form userId={userId}/>
    </main>
  );
}
