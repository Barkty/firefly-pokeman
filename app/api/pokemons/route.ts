import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '150';
    const offset = searchParams.get('offset') || '0';

    const { data } = await axiosInstance.get('/pokemons', {
      params: { limit, offset },
    });

    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon list' },
      { status: 500 }
    );
  }
}