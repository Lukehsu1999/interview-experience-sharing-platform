import Display from '@/app/ui/posts/post-display';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPostById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const post = await fetchPostById(id);
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
      <Display post={post}/>
    </main>
  );
}