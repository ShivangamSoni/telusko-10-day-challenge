import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = await request.text();
  const res = await fetch('http://localhost:8080/api/expand', {
    method: 'post',
    body: url,
  });
  const expandedUrl = await res.text();
  return NextResponse.json({ original: url, expandedUrl });
}
