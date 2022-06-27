import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/notes?select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  });
  const notes = await response.json();
  return NextResponse.json(notes);
};
