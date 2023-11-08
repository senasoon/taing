import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './index';
import { useRecoilState } from 'recoil';
import { authStateAtom } from '@/store/authState';

export function useAuthState() {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setAuthState({ isLoading: true, user: null, error: null });
    onAuthStateChanged(
      auth,
      (currentUser) => {
        setAuthState({ isLoading: false, user: currentUser, error: null });
        setInit(true);
      },
      (error) => {
        setAuthState({ user: null, isLoading: false, error: error });
        setInit(true);
      }
    );
  }, []);

  return useMemo(
    () => ({
      authState,
      init,
    }),
    [authState, init]
  );
}
