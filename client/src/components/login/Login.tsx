import React, { FormEvent } from 'react';

interface ILogin {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setHasAccount }: ILogin) => {
  function signInUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Please Sign In!</h2>
      <form onSubmit={(e) => signInUserHandler(e)}>
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="password">Password</label>
        <input id="password" />
        <button type="button">Sign In</button>
      </form>
      <div>
        <button onClick={() => setHasAccount(false)}>
          Don't have account?
        </button>
      </div>
    </div>
  );
};

export default Login;
