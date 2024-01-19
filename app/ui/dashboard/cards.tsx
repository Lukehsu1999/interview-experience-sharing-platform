import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  coin: BanknotesIcon,
  like: UserGroupIcon,
  view: ClockIcon,
};

export default async function CardWrapper(props: { userId: string }) {
  const {
    numberOfLikes,
    numberOfViews,
    totalCoins
  } = await fetchCardData(props.userId);
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Total Likes" value={numberOfLikes} type="like" />
      <Card title="Total Views" value={numberOfViews} type="view" />
      <Card title="Total Coins" value={totalCoins} type="coin" />
      {/* <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
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
  type: 'coin' | 'like' | 'view';
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
