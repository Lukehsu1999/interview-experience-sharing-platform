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
            <strong>Welcome to Miumee Interview/Work Experience Sharing Platform.</strong>{' '}
            We aim to build a sustainable and supportive network.
            We aim to provide experience seekers accurate and high quality contents.
            We believe that experience sharers should be rewarded for their contribution.
          </p>
          <Link
            href="/login"
            className="bg-miumee-color-500 hover:bg-miumee-color-400 flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Join</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 grid grid-cols-1">
          {/* Add Hero Images Here */}
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}><strong>Share, Meet, Earn $150!</strong></p>
          <Image
            src="/Contest-Rules.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/Contest-Rules.png"
            width={560}
            height={430}
            className="md:hidden block mt-4"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}><strong>Search for Interview Experience</strong></p>
          <Image
            src="/demo_all_posts.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_all_posts.png"
            width={560}
            height={430}
            className="md:hidden block mt-4"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}><strong>Send Invitation for a quick Call</strong></p>
          <Image
            src="/demo_view_post.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_view_post.png"
            width={560}
            height={430}
            className="md:hidden block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}><strong>Share your interview experience</strong></p>
          <Image
            src="/demo_create_post.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_create_post.png"
            width={560}
            height={430}
            className="md:hidden block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}><strong>Track your progress and earn points</strong></p>
          <Image
            src="/demo_profile.png"
            width={1000}
            height={760}
            className="hidden md:block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_profile.png"
            width={560}
            height={430}
            className="md:hidden block mt-4 mb-6"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
