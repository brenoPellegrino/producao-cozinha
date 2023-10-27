// UserContext.ts
import { createContext } from 'react';
import IUser from '../../interfaces/IUser';

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;



