import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ColumbiaLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <Image src="/ColumbiaLogo.png" alt="Columbia" width={250} height={44} />
    </div>
  );
}
