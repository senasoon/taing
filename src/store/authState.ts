import { IAuthStateAtom } from '@/types/auth';
import { atom } from 'recoil';

export const authStateAtom = atom<IAuthStateAtom>({
  key: 'authStateAtom',
  default: {
    isLoading: false,
    user: null,
    error: null,
  },
  dangerouslyAllowMutability: true,
});
