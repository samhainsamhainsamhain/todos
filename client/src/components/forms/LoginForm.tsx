import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../api/api';
import { UserCredentialsParams } from '../../types/User';

interface ILogin {}

const LoginForm = ({}: ILogin) => {
  const { register, handleSubmit, formState } =
    useForm<UserCredentialsParams>();
  const navigate = useNavigate();

  async function signInUserHandler(data: UserCredentialsParams) {
    try {
      await postLoginUser({ ...data });
      navigate('/');
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
        <span>Don't have an account? </span>
        <Link to="/register">
          <span>Sign up!</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
