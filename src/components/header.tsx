'use client';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuWindow from '@/components/menuWindow';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UserContext from '@/store/userContext';

export default function Header() {
  const [showWin, setShowWin] = useState(false);
  const [logoutTrue, setLogoutTrue] = useState(false);
  const { loginUser, setLoginUser, setUserId }: any = useContext(UserContext);

  const showProf = () => {
    setShowWin(!showWin);
  };

  const router = useRouter();
  const signout = async () => {
    try {
      const res = await Axios.get('/api/users/logout');
      const logoutSuccess = res.data.success;
      if (logoutSuccess) {
        setLoginUser('');
        setUserId('');
        toast.success('Logout successful');
        setLogoutTrue(logoutSuccess);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (logoutTrue) {
      router.push('/');
    }
  }, [router, logoutTrue]);

  return (
    <div>
      {' '}
      <header className=" bg-neutral-700">
        <div className="mx-12 lg:mx-24">
          <div className="flex h-12 justify-between px-4 shadow-md items-center">
            <div>
              <Link href="/">
                <b className="hover:text-amber-500">New-LisanKebab</b>
              </Link>
            </div>
            <div>
              <ul className="fontAwesome-size flex">
                {loginUser ? (
                  <li>
                    <Link href="/dashboard" className="hover:text-amber-500">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>{''}</li>
                )}

                {loginUser ? (
                  <li>
                    <p>Hello! {loginUser} </p>
                  </li>
                ) : (
                  <li>
                    <Link href="/signup" className="hover:text-amber-500">
                      Register
                    </Link>
                  </li>
                )}
                {loginUser ? (
                  <li>
                    <div
                      className="hover:text-amber-500 cursor-pointer"
                      onClick={signout}
                    >
                      Logout
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link href="/login" className="hover:text-amber-500">
                      Login
                    </Link>
                  </li>
                )}

                {/* <Link
                  href="/dashboard/profile"
                  className="hover:text-amber-500"
                >
                  profile
                </Link> */}
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500"
                    onClick={showProf}
                  >
                    M<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
