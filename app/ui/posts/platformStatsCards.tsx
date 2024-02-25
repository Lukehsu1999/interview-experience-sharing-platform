import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    EyeIcon,
    ChatBubbleLeftRightIcon,
    NewspaperIcon
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
  import { fetchPlatformStats } from '@/app/lib/data';
  
  const iconMap = {
    posts: NewspaperIcon,
    users: UserGroupIcon,
    meets: ChatBubbleLeftRightIcon,
    views: EyeIcon,
  };
  
  export default async function PlatformCardWrapper() {
    const {
      numberOfPosts,
      numberOfUsers,
      numberOfViews,
      numberOfMeets
    } = await fetchPlatformStats();
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
        <Card title="Total Users" value={numberOfUsers} type="users" />
        <Card title="Total Posts" value={numberOfPosts} type="posts" />
        <Card title="Total Unique Views" value={numberOfViews} type="views" />
        <Card title="Total Meetups between Students" value={numberOfMeets} type="meets" />
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'posts' | 'users' | 'meets'| 'views';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  