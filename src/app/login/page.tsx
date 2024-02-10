'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [btnDisable, setBtnDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios.post('/api/users/login', user);
      console.log('Login success', res);
      toast.success('Login success');
      router.push('/dashboard');
    } catch (error: any) {
      console.log('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (
  //     user.email.length > 0 &&
  //     user.password.length > 0 &&
  //     user.username.length > 0
  //   ) {
  //     setBtnDisable(false);
  //   } else {
  //     setBtnDisable(true);
  //   }
  // }, [user]);

  return (
    <div className="color-login">
      <form
        className="py-4 border-2 p-4 text-center bg-stone-900 opacity-80"
        onSubmit={onLogin}
      >
        <h2 className="font-bold">Please Login!</h2>
        <div className="py-2 mb-4">
          <label htmlFor="names" className="px-2">
            User Name :
          </label>
          <select
            name="manager"
            id="manager"
            className="bg-gray-600"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          >
            <option value="">{null}</option>
            <option value="iqbal">Iqbal</option>
            <option value="rokon">Rokon</option>
            <option value="lition">Lition</option>
          </select>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">Email:</label>
          <input
            type="text"
            name="userName"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-gray-500 px-2"
            placeholder="Enter your email"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <label className="form-label px-2">Password :</label>
          <input
            type="Password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-gray-500 px-2"
            placeholder="At least 6 characters"
          />
          <div className="invalid-feedback text-xs"></div>
        </div>
        <div className="py-2 mb-4">
          <button
            type="submit"
            className="btn btn-primary bg-black px-4 py-2 rounded hover:text-amber-500"
          >
            login!
          </button>
        </div>
      </form>
    </div>
  );
}
