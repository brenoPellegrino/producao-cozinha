import { ReactNode, useState } from "react";
import UserContext from "./UserContext";
import IUser from "../../interfaces/IUser";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};