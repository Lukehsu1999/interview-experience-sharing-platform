import Form from '@/app/ui/posts/create-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
 
export default async function Page() {
 
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
      <Form/>
    </main>
  );
}