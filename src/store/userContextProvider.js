'use client';
import React, { useState } from 'react';
import UserContext from './userContext';

const UserContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState('');
  const [pinWin, setPinWin] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [userId, setUserId] = useState('');
  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
        pinWin,
        setPinWin,
        branchName,
        setBranchName,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
