import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface ILogin {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setHasAccount }: ILogin) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {};

  function signInUserHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Please Sign In!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username', { required: true })} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
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
