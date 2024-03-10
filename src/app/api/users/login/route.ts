import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    const user = await User.findOne({ email });

    // checking if the user exist

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    // checking if the username has matched

    if (user.username !== username) {
      return NextResponse.json(
        { error: 'User-name did not match' },
        { status: 404 }
      );
    }

    if (
      user.branchName === 'kapelanka' ||
      user.branchName === 'balicka' ||
      user.branchName === 'bulwar'
    ) {
      // comparing the password
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 404 }
        );
      }

      // creating a token data
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      // creat token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: '2h',
      });

      const response = NextResponse.json({
        message: 'Login successful',
        success: true,
      });
      response.cookies.set('token', token, {
        httpOnly: true,
      });
      return response;
    } else {
      return NextResponse.json(
        { error: 'Branch-name did not match' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
