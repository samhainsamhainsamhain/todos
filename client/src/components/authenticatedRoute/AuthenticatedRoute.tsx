import { FC, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/api';
import { AuthContext } from '../../utils/AuthContext';
import { useAuth } from '../../utils/hooks/useAuth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { loading, user } = useAuth();

  const { updateAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    logoutUser();
    updateAuthUser();
    navigate('/login');
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <h2>Auth route</h2>
      <button onClick={logOut}>Logout</button>
      {children}
    </>
  );
};
