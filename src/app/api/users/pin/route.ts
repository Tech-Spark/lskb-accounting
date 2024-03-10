import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, pinCode, branchName } = reqBody;
    const user = await User.findOne({ _id: userId });

    // checking if the user exist

    if (!user) {
      return NextResponse.json(
        { error: 'Could not find the user id' },
        { status: 400 }
      );
    }
    if (pinCode !== user.pinCode) {
      return NextResponse.json(
        { error: 'PinCode did not match' },
        { status: 404 }
      );
    }
    if (branchName !== user.branchName) {
      return NextResponse.json(
        { error: 'you are not allowed to enter in this branch!' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      message: 'Pin validation is successful',
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
