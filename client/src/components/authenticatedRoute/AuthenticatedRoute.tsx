import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  if (user) return <>{children}</>;
  return <Navigate to="/login" state={{ from: location }} replace />;
};
