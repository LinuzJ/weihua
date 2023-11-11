import { RecordAuthResponse } from "pocketbase";
import { ReactNode, createContext, useContext, useState } from "react";
import PocketBase from "pocketbase";

interface Auth {
  login: ()
}

export const AuthContext = createContext<RecordAuthResponse | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(null);
  const {pb} = usePocketBase("https://junctionb.nyman.dev")

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
