import MiumeeLogo from '@/app/ui/miumee-logo';
import ColumbiaLogo from './ui/columbia-logo';
import BarnardLogo from './ui/barnard-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Demoblock from '@/app/ui/landingpage/demoblock';
import PlatformCardWrapper from './ui/posts/platformStatsCards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
//maybe I will add session here

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-miumee-color-400 p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-miumee-color-500 p-4 md:h-52">
        <MiumeeLogo />
        {/* <ColumbiaLogo />
        <BarnardLogo /> */}
        <div className="hidden md:block md:flex md:flex-grow md:items-end md:justify-end">
          <Link
            href="/login"
            className="mr-5  flex items-center gap-5 self-start rounded-lg bg-highlightgreen-200 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-highlightgreen-300 md:text-base"
          >
            <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/register"
            className="bg-highlightgreen-100 flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-highlightgreen-200 md:text-base"
          >
            <span>Sign up for free</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
      <div className="gPap-4 mt-4 flex grow flex-col"> {/*md:flex-row*/}
        <div className="flex flex-col item-center justify-center gap-6 rounded-lg bg-miume-color-400 px-6 py-10 md:px-20"> {/*md:w-2/5*/}
          {' '}
          {/*md:w-2/5*/}
          <p className={`text-xl text-gray-800 md:text-4xl md:leading-normal text-center`}>
            {/* Student Career-Development Sharing Platform<br></br>
            <br></br> */}
            <span className="font-bold text-miumee-color-500">
              Come here to find experiences in
            </span>
            <br></br>
            {/* Come here to share your experiences in <br></br> */}
            <span className="font-bold text-white md:text-5xl">
              🗣️ Interview
            </span>
            <span className="md:ml-5"></span>
            
            <span className="font-bold text-white md:text-5xl">💼 Work  </span>
            <span className="md:ml-5"></span>
            
            <span className="font-bold text-white md:text-5xl">
              🏫 School Admission  
            </span>
            <span className="md:ml-5"></span>
            
            <span className="font-bold text-white md:text-5xl">👩‍🔬 Research</span>
            {/* <br></br> */}
            {/* <span className="font-bold text-miumee-color-500">
              Help People and Earn Money 💵!
            </span> */}
            {/* We aim to build a sustainable and supportive network. <br></br>
            Providing experience seekers accurate and high quality contents.<br></br> */}
          </p>
          <Link
            href="/register"
            className="max-w-xs mx-auto bg-highlightgreen-100 flex items-center gap-5 rounded-lg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-highlightgreen-200 md:text-base"
          >
            <span>Sign up for free</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/login"
            className="max-w-xs mx-auto bg-highlightgreen-100 flex items-center gap-5 rounded-lg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-highlightgreen-200 md:text-base"
          >
            <span>login</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex grid gap-6 items-start justify-center p-6 sm:grid-cols-1 md:px-12 sm:px-6 lg:grid-cols-4"> {/*md:w-3/5*/}
          {/* <Demoblock />  */}
          <Suspense fallback={<CardsSkeleton />}>
            <PlatformCardWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
