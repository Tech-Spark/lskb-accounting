'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuWindow from '@/components/menuWindow';

export default function Header() {
  const [showWin, setShowWin] = React.useState(false);

  const showProf = () => {
    setShowWin(!showWin);
  };

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
              <div className="fontAwesome-size flex">
                <Link href="/dashboard" className="hover:text-amber-500">
                  Dashboard
                </Link>
                <Link href="/signup" className="hover:text-amber-500">
                  Register
                </Link>{' '}
                <Link
                  href="#"
                  className="hover:text-amber-500"
                  onClick={showProf}
                >
                  M<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
