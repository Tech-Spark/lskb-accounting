import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthenticated' },
      {
        status: 401,
      }
    );
  }
  const { value } = token;
  const secret = process.env.TOKEN_SECRET || '';
  try {
    const data = verify(value, secret);
    return NextResponse.json(
      { message: 'User details', data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 404,
      }
    );
  }
}
