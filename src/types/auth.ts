import { User } from 'firebase/auth';

export interface IAuthStateAtom {
  isLoading: boolean;
  user: User | null;
  error: Error | null;
}
