import Image from 'next/image';

import CopyIcon from '@/assets/copy.svg';

export default function UrlViewSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <span className="w-[min(250px,100%)] h-8 animate-pulse bg-bg-bar"></span>
      <div className="w-[min(450px,100%)] bg-bg-bar px-3 sm:px-6 py-3 rounded-lg sm:rounded-full sm:text-lg pr-10 flex flex-col items-center gap-4">
        <span className="h-8 animate-pulse bg-bg-main w-11/12"></span>
        <span className="relative w-5 aspect-square flex items-center justify-center">
          <span className="sr-only">Copy URL</span>
          <Image src={CopyIcon} alt="" />
        </span>
      </div>
    </div>
  );
}
