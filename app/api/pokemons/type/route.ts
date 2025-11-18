import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const ability = searchParams.get('ability');

    const { data } = await axiosInstance.get('/pokemons/type', {
      params: { type, ability },
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