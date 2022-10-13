import { FC } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
import Auth from '../auth/Auth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  if (user) return <>{children}</>;
  return <Auth />;
};
