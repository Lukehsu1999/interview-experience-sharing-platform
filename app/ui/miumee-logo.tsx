import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function MiumeeLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <Image src="/White logo - no background.png" alt="Miumee" width={150} height={44} />
    </div>
  );
}
