import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    const { data } = await axiosInstance.delete(`/favourites/${id}`);
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Return the actual error message from backend
    return NextResponse.json(
      { 
        error: error.response?.data?.message || 'Failed to remove favorite',
        details: error.response?.data 
      },
      { status: error.response?.status || 500 }
    );
  }
}