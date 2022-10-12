import React, { FormEvent } from 'react';

interface IRegistration {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Registration = ({ setHasAccount }: IRegistration) => {
  function signUpUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
        <button onClick={() => setHasAccount(true)}>
          Already have account?
        </button>
      </div>
    </div>
  );
};

export default Registration;
