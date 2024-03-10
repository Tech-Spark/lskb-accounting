import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const responese = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
    responese.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    return responese;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
