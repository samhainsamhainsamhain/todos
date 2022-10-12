import React, { useState } from 'react';
import Login from '../login/Login';
import Registration from '../registration/Registration';

export default function Auth() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <>
      {hasAccount ? (
        <Login setHasAccount={setHasAccount} />
      ) : (
        <Registration setHasAccount={setHasAccount} />
      )}
    </>
  );
}
