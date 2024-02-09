import MiumeeLogo from '@/app/ui/miumee-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
//maybe I will add session here

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-miumee-color-500 p-4 md:h-52">
        <MiumeeLogo/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Interview Experience Sharing Platform.</strong> This is a prototype for letting people to create sharing posts on interview experience, 
            regardless of the company, position, and industry.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-miumee-color-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-miumee-color-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  );
}
