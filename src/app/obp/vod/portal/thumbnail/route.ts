import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['http://dmng.dowhat.co.kr', 'https://smng.dowhat.co.kr'];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : '*';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('origin')),
  });
}

export async function POST(request: Request) {
  return new NextResponse('1', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(request.headers.get('origin')),
    },
  });
}
