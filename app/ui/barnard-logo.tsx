import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function BarnardLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <Image src="/barnard_word2.png" alt="Barnard" width={250} height={44} />
    </div>
  );
}
