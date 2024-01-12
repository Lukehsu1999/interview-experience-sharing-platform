import Image from 'next/image';
import { ViewPost } from '@/app/ui/posts/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPosts } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);
  console.log(posts);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{post.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">{post.title}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {post.title}
                    </p> 
                    <p>{formatDateToLocal(post.creation_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewPost id={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Creator
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                  Company
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creator
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Views
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Likes
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts?.map((post) => (
                <tr
                  key={post.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.company}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.title} 
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(post.creation_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {post.interview_status}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {post.interview_type}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {post.name}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {post.views}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {post.likes}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPost id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
