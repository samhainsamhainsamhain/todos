import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { postRegisterUser } from '../../api/api';

interface IRegistration {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Registration = ({ setHasAccount }: IRegistration) => {
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

  function signUpUserHandler(data: any) {
    postRegisterUser({ ...data });
  }

  return (
    <div>
      <h2>Please Sign up!</h2>
      <form onSubmit={handleSubmit(signUpUserHandler)}>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username', { required: true })} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', { required: true })}
        />
        <button type="submit" disabled={!formState.isValid}>
          Sign Up
        </button>
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
