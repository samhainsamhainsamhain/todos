import { useContext, useEffect, useState } from 'react';
import { getAuthUser } from '../../api/api';
import { AuthContext } from '../AuthContext';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  });

  return { user, loading };
}
