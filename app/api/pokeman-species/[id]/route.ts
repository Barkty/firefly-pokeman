import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data } = await axiosInstance.get(`/pokemon-species/${id}`);
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon species' },
      { status: 500 }
    );
  }
}