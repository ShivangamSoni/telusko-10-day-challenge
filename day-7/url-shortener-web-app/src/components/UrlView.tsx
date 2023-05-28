import { useEffect, useState } from 'react';

import CopyIcon from '@/assets/copy.svg';
import Image from 'next/image';

export default function UrlView({
  data,
}: {
  data: { original: string; shortUrl: string };
}) {
  const { original, shortUrl } = data;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [data]);

  async function copyUrl() {
    if (data && !copied && navigator.clipboard) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span>Original: {original}</span>
      <div className="bg-bg-bar px-6 py-3 rounded-full text-lg relative flex items-center gap-[0.5ch]">
        Shortened: <span className="font-semibold">{shortUrl}</span>
        <button
          onClick={copyUrl}
          className="w-5 aspect-square flex items-center justify-center"
        >
          <span className="sr-only">Copy URL</span>
          <Image src={CopyIcon} alt="" />
        </button>
        <span
          className={`absolute left-full top-0 ml-1 text-sm text-primary-blue bg-white px-1 py-0.5 rounded-full transition-transform duration-300 ${
            copied ? 'scale-100' : 'scale-0'
          }`}
        >
          Copied
        </span>
      </div>
    </div>
  );
}
