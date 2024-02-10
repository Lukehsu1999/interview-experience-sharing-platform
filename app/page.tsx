import MiumeeLogo from '@/app/ui/miumee-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
//maybe I will add session here

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-miumee-color-400">
      <div className="bg-miumee-color-500 flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52">
        <MiumeeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-start gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Interview Experience Sharing Platform.</strong>{' '}
            This is a prototype for letting people to create sharing posts on
            interview experience, regardless of the company, position, and
            industry.
          </p>
          <Link
            href="/login"
            className="bg-miumee-color-500 hover:bg-miumee-color-400 flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 grid grid-cols-1">
          {/* Add Hero Images Here */}
          <Image
            src="/demo_all_posts.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_view_post.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_profile.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_create_post.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
        {/* <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 grid grid-cols-1 lg:block">
          <Image
            src="/demo_all_posts.png"
            width={560}
            height={426}
            className="hidden mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_view_post.png"
            width={560}
            height={426}
            className="hidden mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_profile.png"
            width={560}
            height={426}
            className="hidden mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_create_post.png"
            width={560}
            height={426}
            className="hidden mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div> */}
      </div>
    </main>
  );
}
