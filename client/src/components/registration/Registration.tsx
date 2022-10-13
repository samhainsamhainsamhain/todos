import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface IRegistration {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Registration = ({ setHasAccount }: IRegistration) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  function signUpUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Please Sign up!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          id="password-confirm"
          {...register('password-confirm', { required: true })}
        />
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
