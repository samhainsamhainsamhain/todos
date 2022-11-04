import axios from 'axios';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { postRegisterUser } from '../../api/api';
import { CreateUserParams } from '../../types/User';

interface IRegistration {}

const RegisterForm = ({}: IRegistration) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<CreateUserParams>({
    mode: 'onChange',
  });
  const [error, setError] = useState<string | null>(null);

  async function signUpUserHandler(data: CreateUserParams) {
    try {
      await postRegisterUser({ ...data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setError('User already exists');
      } else {
        setError('Unexpected error occured');
      }
    }
  }

  const SignUpError = () => {
    return <div className="Auth_error">{error}</div>;
  };

  return (
    <div className="Auth_body">
      <h2 className="Auth_title">Please Sign up!</h2>
      <form className="Auth_form" onSubmit={handleSubmit(signUpUserHandler)}>
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
        <label className="label" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="input"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: true,
            validate: (val: string) => {
              const { password } = getValues();
              return password === val || 'Passwords should match!';
            },
          })}
        />
        {error ? <SignUpError /> : null}
        <button className="submit" type="submit" disabled={!isValid}>
          Sign Up
        </button>
      </form>
      <div>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Sign in!</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
