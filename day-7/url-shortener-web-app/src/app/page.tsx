'use client';

import SearchBar from '@/components/SearchBar';
import UrlView from '@/components/UrlView';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState<{
    original: string;
    shortUrl: string;
  } | null>(null);

  async function shortenUrl(url: string) {
    const res = await fetch('/api/shorten', {
      method: 'post',
      body: url,
    });
    setData(await res.json());
  }

  return (
    <main className="grid content-center gap-16 py-20">
      <p className="capitalize text-7xl font-semibold tracking-wider flex flex-col gap-8">
        <span>the shorter,&nbsp;</span>
        <span>the better</span>
      </p>
      <SearchBar label="URL to Shorten" onSubmit={(url) => shortenUrl(url)} />
      {data && (
        <UrlView
          data={{ original: data.original, response: data.shortUrl }}
          label={{ original: 'Original', response: 'Shortened' }}
        />
      )}
    </main>
  );
}
