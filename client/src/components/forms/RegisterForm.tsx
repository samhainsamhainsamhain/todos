import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { postRegisterUser } from '../../api/api';
import { CreateUserParams } from '../../types/User';

interface IRegistration {}

const RegisterForm = ({}: IRegistration) => {
  const { register, handleSubmit, formState } = useForm<CreateUserParams>({
    mode: 'onChange',
  });

  async function signUpUserHandler(data: CreateUserParams) {
    try {
      await postRegisterUser({ ...data });
    } catch (error) {
      console.error(error);
    }
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
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Sign in!</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
