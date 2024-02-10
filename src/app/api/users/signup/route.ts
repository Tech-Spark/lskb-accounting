import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  let kapId = '2040';
  let balId = '2050';
  let karId = '2060';
  let pinCode = 'EG60K';

  try {
    const reqBody = await request.json();
    const { username, email, password, confirmPassword, branchCode } = reqBody;

    if (password.length < 6 || password.length > 8) {
      return NextResponse.json(
        { error: 'Password must be minmum 6 digit & maximum 8!' },
        { status: 400 }
      );
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Confirm-Password did not match!' },
        { status: 400 }
      );
    }

    if (branchCode !== kapId) {
      return NextResponse.json(
        { message: 'Branch code did not match!' },
        { status: 404 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      branchCode,
      pinCode,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json(
      {
        message: 'User created successfully',
        success: true,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
