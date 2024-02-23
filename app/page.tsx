import MiumeeLogo from '@/app/ui/miumee-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
//maybe I will add session here

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-miumee-color-400 p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-miumee-color-500 p-4 md:h-52">
        <MiumeeLogo />
        <div className="hidden md:block md:flex md:flex-grow md:items-end md:justify-end">
          <Link
            href="/login"
            className="flex items-center gap-5 mr-5 self-start rounded-lg bg-highlightgreen-100 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-miumee-color-400 md:text-base"
          >
            <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-5 self-start rounded-lg bg-highlightgreen-100 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-miumee-color-400 md:text-base"
          >
            <span>Sign up for free</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
      <div className="gPap-4 mt-4 flex grow flex-col md:flex-row">
        <div className="flex flex-col justify-start gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Miumee</strong>
            <br></br>
            Student Career-Development Sharing Platform<br></br>
            <br></br>
            <span className="font-bold text-miumee-color-400">
              Come here to share your experiences in
            </span>
            <br></br>
            {/* Come here to share your experiences in <br></br> */}
            <span className="font-bold text-miumee-color-500">
              🗣️ Interview,
            </span>
            <br></br>
            <span className="font-bold text-miumee-color-500">💼 Work,</span>
            <br></br>
            <span className="font-bold text-miumee-color-500">
              🏫 School Admission,
            </span>
            <br></br>
            <span className="font-bold text-miumee-color-500">👩‍🔬 Research</span>
            <br></br>
            <span className="font-bold text-miumee-color-400">
              Help People and Earn Money 💵!
            </span>
            <br></br>
            {/* We aim to build a sustainable and supportive network. <br></br>
            Providing experience seekers accurate and high quality contents.<br></br> */}
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-highlightgreen-100 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-miumee-color-400 md:text-base"
          >
            <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-5 self-start rounded-lg bg-highlightgreen-100 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-miumee-color-400 md:text-base"
          >
            <span>Sign up for free</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex grid grid-cols-1 items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Help people by making a post and win $150!</strong>
          </p>
          <Image
            src="/Contest-Rules-2.png"
            width={1000}
            height={760}
            className="mt-4 hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/Contest-Rules-2.png"
            width={560}
            height={430}
            className="mt-4 block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Search for Interview Experience</strong>
          </p>
          <Image
            src="/demo_all_posts.png"
            width={1000}
            height={760}
            className="mt-4 hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_all_posts.png"
            width={560}
            height={430}
            className="mt-4 block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Send Invitation for a quick Call</strong>
          </p>
          <Image
            src="/demo_view_post.png"
            width={1000}
            height={760}
            className="mb-6 mt-4 hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_view_post.png"
            width={560}
            height={430}
            className="mb-6 mt-4 block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Share your interview experience</strong>
          </p>
          <Image
            src="/demo_create_post.png"
            width={1000}
            height={760}
            className="mb-6 mt-4 hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_create_post.png"
            width={560}
            height={430}
            className="mb-6 mt-4 block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Track your progress and earn points</strong>
          </p>
          <Image
            src="/demo_profile.png"
            width={1000}
            height={760}
            className="mb-6 mt-4 hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/demo_profile.png"
            width={560}
            height={430}
            className="mb-6 mt-4 block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
