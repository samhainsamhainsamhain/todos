import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

export const AuthenticatedRoute = () => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) return <h3>Loading...</h3>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
