import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = await request.text();
  console.log(url);
  const res = await fetch('http://localhost:8080/api/shorten', {
    method: 'post',
    body: url,
  });
  const shortUrl = await res.text();
  return NextResponse.json({ original: url, shortUrl });
}
