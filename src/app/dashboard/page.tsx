'use client';
import Popupwindow from '@/components/popupinwindow';
import UserContext from '@/store/userContext';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Dashboard() {
  const { loginUser, pinWin, setPinWin, branchName, setBranchName }: any =
    useContext(UserContext);

  function useOnClickOutside(e: any) {
    setPinWin(true);
    let name = e.currentTarget.getAttribute('value');
    setBranchName(name);
    console.log(pinWin, branchName);
  }
  function userPin(e: any) {}
  return (
    <>
      {loginUser === '' ? (
        <p>You are not logedin</p>
      ) : (
        <div>
          <h1 className="text-3xl mb-2">Welcome to Dashboard</h1>
          <hr />
          <h2 className="mb-4 mt-2 text-xl">Please select your Branch!</h2>
          <ul className="flex justify-around mt-3 mb-3 flex-wrap">
            <li
              className="w-60 border-2 border-stone-500 p-2 h-20 text-center mb-5"
              value="balicka"
              onClick={useOnClickOutside}
            >
              <Link href="" className="">
                Balicka_14A
              </Link>
            </li>
            <li
              className="w-60  border-2 border-stone-500 p-2 h-20 text-center mb-5"
              onClick={useOnClickOutside}
              value="kapelanka"
            >
              <Link href={''} className="">
                Kapelanka_15C
              </Link>
            </li>
            <li
              className="w-60  border-2 border-stone-500 p-2 h-20 text-center mb-5"
              value="bulwar"
              onClick={useOnClickOutside}
            >
              <Link href="" className="">
                Bulwar
              </Link>
            </li>
          </ul>
          <div className="myPop">
            {pinWin ? <Popupwindow></Popupwindow> : ''}
          </div>
        </div>
      )}
    </>
  );
}
