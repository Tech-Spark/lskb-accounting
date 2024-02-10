import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unque: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  branchCode: {
    type: Number,
    required: [true, 'Please provide branch code'],
  },
  pinCode: {
    type: String,
    required: [true, 'Please provide a branch code'],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
