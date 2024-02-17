import Image from 'next/image';
export default function Page() {
    const large_width = 1000;
    const large_height = 760;
    const small_width = 560;
    const small_height = 430;
  return (
    <main className="flex min-h-screen flex-col bg-miumee-color-400 p-6">
      <div className="flex grid grid-cols-1 items-center justify-center p-6 md:px-28 md:py-12">
        {/* Add Hero Images Here */}
        <Image
          src="/About_1.PNG"
          width={large_width}
          height={large_height}
          className="mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/About_1.PNG"
          width={small_width}
          height={small_height}
          className="mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <Image
          src="/About_2.PNG"
          width={large_width}
          height={large_height}
          className="mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/About_2.PNG"
          width={small_width}
          height={small_height}
          className="mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <Image
          src="/Contest_Rules.PNG"
          width={large_width}
          height={large_height}
          className="mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/Contest_Rules.PNG"
          width={small_width}
          height={small_height}
          className="mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
          <strong>Search for Interview Experience</strong>
        </p>
        <Image
          src="/demo_all_posts.png"
          width={large_width}
          height={large_height}
          className="mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/demo_all_posts.png"
          width={small_width}
          height={small_height}
          className="mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
          <strong>Send Invitation for a quick Call</strong>
        </p>
        <Image
          src="/demo_view_post.png"
          width={large_width}
          height={large_height}
          className="mb-6 mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/demo_view_post.png"
          width={small_width}
          height={small_height}
          className="mb-6 mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
          <strong>Share your interview experience</strong>
        </p>
        <Image
          src="/demo_create_post.png"
          width={large_width}
          height={large_height}
          className="mb-6 mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/demo_create_post.png"
          width={small_width}
          height={small_height}
          className="mb-6 mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
          <strong>Track your progress and earn points</strong>
        </p>
        <Image
          src="/demo_profile.png"
          width={large_width}
          height={large_height}
          className="mb-6 mt-4 hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/demo_profile.png"
          width={small_width}
          height={small_height}
          className="mb-6 mt-4 block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
      </div>
    </main>
  );
}
