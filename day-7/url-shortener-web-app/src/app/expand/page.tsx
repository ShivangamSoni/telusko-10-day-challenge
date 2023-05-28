'use client';

import { useState } from 'react';

import SearchBar from '@/components/SearchBar';
import UrlView from '@/components/UrlView';

export default function Home() {
  const [data, setData] = useState<{
    original: string;
    expandedUrl: string;
  } | null>(null);

  async function expandUrl(url: string) {
    const res = await fetch('/api/expand', {
      method: 'post',
      body: url,
    });
    setData(await res.json());
  }

  return (
    <main className="grid content-center gap-16 py-20">
      <p className="capitalize text-3xl sm:text-5xl md:text-7xl font-semibold tracking-wider flex flex-col gap-2 sm:gap-6 md:gap-8">
        <span>Find the Reality,&nbsp;</span>
        <span>Behind the URL</span>
      </p>
      <SearchBar label="URL to Expand" onSubmit={(url) => expandUrl(url)} />
      {data && (
        <UrlView
          data={{ original: data.original, response: data.expandedUrl }}
          label={{ original: 'Shortened', response: 'Original' }}
        />
      )}
    </main>
  );
}
