import React, { FormEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postLoginUser } from '../../api/api';
import { UserCredentialsParams } from '../../types/User';
import { AuthContext } from '../../utils/AuthContext';

interface ILogin {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setHasAccount }: ILogin) => {
  const { user, updateAuthUser } = useContext(AuthContext);
  const { register, handleSubmit, formState } =
    useForm<UserCredentialsParams>();

  async function signInUserHandler(data: UserCredentialsParams) {
    try {
      const userData = await postLoginUser({ ...data });
      updateAuthUser({
        username: userData.data.username,
        id: userData.data.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Please Sign In!</h2>
      <form onSubmit={handleSubmit(signInUserHandler)}>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username', { required: true })} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        <button type="submit">Sign In</button>
      </form>
      <div>
        <button onClick={() => setHasAccount(false)}>
          Don't have account?
        </button>
        <button onClick={() => console.log(user)}>Check User</button>
      </div>
    </div>
  );
};

export default Login;
