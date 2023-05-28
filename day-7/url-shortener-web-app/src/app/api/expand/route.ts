import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = await request.text();
  const res = await fetch(`${process.env.API_URL}/api/expand`, {
    method: 'post',
    body: url,
  });
  const expandedUrl = await res.text();
  return NextResponse.json({ original: url, expandedUrl });
}
