import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({
      status: 'error',
      message: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local',
    }, { status: 500 });
  }

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase.from('_test_nonexistent_').select('id').limit(1);

    // These error messages/codes all mean we ARE connected — the table just doesn't exist yet
    const isConnected =
      !error ||
      error.code === '42P01' ||
      error.message?.includes('does not exist') ||
      error.message?.includes('Could not find the table') ||
      error.message?.includes('schema cache');

    if (isConnected) {
      return NextResponse.json({
        status: 'connected',
        message: '✅ Supabase connection is working. No tables created yet (that is expected).',
        url,
      });
    }

    return NextResponse.json({ status: 'error', message: error?.message }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
