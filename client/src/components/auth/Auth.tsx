import React, { FormEvent, useState } from 'react';

export default function Auth() {
  const [hasAccount, setHasAccount] = useState(true);

  function signUpUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function signInUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function signUpForm() {
    return (
      <div>
        <h2>Please Sign up!</h2>
        <form onSubmit={(e) => signUpUserHandler(e)}>
          <label htmlFor="username">Username</label>
          <input id="username" />
          <label htmlFor="password">Password</label>
          <input id="password" />
          <label htmlFor="password">Confirm Password</label>
          <input id="password-confirm" />
          <button type="button">Sign Up</button>
        </form>{' '}
        <div>
          <button onClick={() => setHasAccount(!hasAccount)}>
            Already have account?
          </button>
        </div>
      </div>
    );
  }

  function signInForm() {
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
          <button onClick={() => setHasAccount(!hasAccount)}>
            Don't have account?
          </button>
        </div>
      </div>
    );
  }

  return <>{hasAccount ? signInForm() : signUpForm()}</>;
}
