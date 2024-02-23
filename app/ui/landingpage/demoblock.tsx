import Image from 'next/image';

export default function Demoblock() {
  return (
    <div>
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
  );
}
