import { useContext, useEffect, useState } from 'react';
import { getAuthUser } from '../../api/api';
import { AuthContext } from '../AuthContext';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  async function getAuthUserAsync() {
    return await getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAuthUserAsync();

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}
