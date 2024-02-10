'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    branchCode: '',
  });

  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="color-login">
      <form
        className="py-4 border-2 p-4 text-center bg-stone-900 opacity-80"
        onSubmit={onSignup}
      >
        <h2 className="font-bold">Registration form</h2>
        <div className="py-2 mb-4">
          <label className="form-label px-2">User-Name:</label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            name="userName"
            placeholder="User name"
            className="bg-gray-500 px-2"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">Email:</label>
          <input
            id="email"
            type="email"
            value={user.email}
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name="email"
            className="bg-gray-500 px-2"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">Password :</label>
          <input
            type="Password"
            value={user.password}
            placeholder="Enter password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            name="password"
            className="bg-gray-500 px-2"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">confirm-Password :</label>
          <input
            type="Password"
            name="confirm-password"
            placeholder="Confirm your password"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="bg-gray-500 px-2"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">Branch-code:</label>
          <input
            type="number"
            id="branchCode"
            placeholder="Enter branch code XXXXX"
            value={user.branchCode}
            onChange={(e) => setUser({ ...user, branchCode: e.target.value })}
            name="branch-code"
            className="bg-gray-500 px-2"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2">
          <button
            type="submit"
            className="btn btn-primary bg-black px-4 py-2 rounded hover:text-amber-500"
          >
            Register!
          </button>
          <div className="text-center text-gray-500 nt-4">-- OR --</div>
          <br />
          <div className="text-xs pt-2">
            <em>
              Already have an account?{' '}
              <Link
                href="/login"
                className="hover:text-amber-500 text-green-500"
              >
                Login
              </Link>
            </em>
          </div>
        </div>
      </form>
    </div>
  );
}
