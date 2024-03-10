import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  let kapId = '30347';
  let balId = '30149';
  let bulId = '30001';
  let max = 5000;
  let min = 1000;
  let pinCode = Math.floor(Math.random() * (max - min + 1) + min);

  try {
    const reqBody = await request.json();
    const {
      username,
      email,
      password,
      confirmPassword,
      branchCode,
      branchName,
    } = reqBody;

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

    if (branchCode == kapId || branchCode == balId || branchCode == bulId) {
      const lowerText = username.toLowerCase();
      const lowerTextBranchN = branchName.toLowerCase();

      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username: lowerText,
        email,
        password: hashedPassword,
        branchCode,
        branchName: lowerTextBranchN,
        pinCode,
      });

      const savedUser = await newUser.save();
      return NextResponse.json(
        {
          message: 'User created successfully',
          success: true,
          savedUser,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Branch code did not match!' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
