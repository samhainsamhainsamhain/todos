import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../api/api';
import { UserCredentialsParams } from '../../types/User';

interface ILogin {}

const LoginForm = ({}: ILogin) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserCredentialsParams>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [error, setError] = useState<AxiosError | null>(null);

  async function signInUserHandler(data: UserCredentialsParams) {
    try {
      await postLoginUser({ ...data });
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error);
      } else {
        console.error(error);
      }
    }
  }

  const LoginError = () => {
    return <div className="Auth_error">Invalid credentials!</div>;
  };

  return (
    <div className="Auth_body">
      <h2 className="Auth_title">Log in</h2>
      <form className="Auth_form" onSubmit={handleSubmit(signInUserHandler)}>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          id="username"
          {...register('username', { required: true })}
        />
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        {error ? <LoginError /> : null}
        <button className="submit" type="submit" disabled={!isValid}>
          Sign In
        </button>
      </form>
      <div>
        <span>Don't have an account? </span>
        <Link to="/register">
          <span>Sign up!</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
