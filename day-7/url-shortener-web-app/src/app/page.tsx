'use client';

import { useState } from 'react';

import SearchBar from '@/components/SearchBar';
import UrlViewSkeleton from '@/components/UrlView/Skeleton';
import UrlView from '@/components/UrlView';

export default function Home() {
  const [data, setData] = useState<{
    original: string;
    shortUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function shortenUrl(url: string) {
    setData(null);
    setLoading(true);
    const res = await fetch('/api/shorten', {
      method: 'post',
      body: url,
    });
    setData(await res.json());
    setLoading(false);
  }

  return (
    <main className="grid content-center gap-16 py-20">
      <p className="capitalize text-3xl sm:text-5xl md:text-7xl font-semibold tracking-wider flex flex-col gap-2 sm:gap-6 md:gap-8">
        <span>the shorter,&nbsp;</span>
        <span>the better</span>
      </p>
      <SearchBar
        label="URL to Shorten"
        onSubmit={(url) => shortenUrl(url)}
        isDisabled={loading}
      />

      {loading && <UrlViewSkeleton />}

      {data && (
        <UrlView
          data={{ original: data.original, response: data.shortUrl }}
          label={{ original: 'Original', response: 'Shortened' }}
        />
      )}
    </main>
  );
}
