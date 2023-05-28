import { useEffect, useState } from 'react';

import CopyIcon from '@/assets/copy.svg';
import Image from 'next/image';

export default function UrlView({
  data,
  label,
}: {
  data: { original: string; response: string };
  label: { original: string; response: string };
}) {
  const { original, response } = data;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [data]);

  async function copyUrl() {
    if (data && !copied && navigator.clipboard) {
      await navigator.clipboard.writeText(response);
      setCopied(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <span>
        {label.original}: {original}
      </span>
      <div className="bg-bg-bar px-3 sm:px-6 py-3 rounded-lg sm:rounded-full sm:text-lg pr-10 flex flex-col items-center gap-4">
        <span>
          {label.response}: <span className="font-semibold">{response}</span>
        </span>
        <button
          onClick={copyUrl}
          className="relative w-5 aspect-square flex items-center justify-center"
        >
          <span className="sr-only">Copy URL</span>
          <Image src={CopyIcon} alt="" />
          <span
            className={`absolute left-full top-0 ml-1 text-xs text-primary-blue bg-white px-1 py-0.5 rounded-full transition-transform duration-300 ${
              copied ? 'scale-100' : 'scale-0'
            }`}
          >
            Copied
          </span>
        </button>
      </div>
    </div>
  );
}
