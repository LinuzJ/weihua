import { RecordAuthResponse } from "pocketbase";
import { ReactNode, createContext, useState } from "react";
import pb from "../pocketBase";

interface Auth {
  user: RecordAuthResponse | null;
  login: (
    username: string,
    password: string,
  ) => Promise<RecordAuthResponse | null>;
  logout: () => void;
}

const defaultAuth: Auth = {
  user: null,
  login: async () => null,
  logout: () => {},
};

export const AuthContext = createContext<Auth>(defaultAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<RecordAuthResponse | null>(
    pb.authStore.isAuthRecord
      ? ({
          record: pb.authStore.model,
          token: pb.authStore.token,
        } as RecordAuthResponse)
      : null,
  );

  const login = async (
    username: string,
    password: string,
  ): Promise<RecordAuthResponse> => {
    const authRes = await pb
      .collection("users")
      .authWithPassword(username, password);
    setUser(authRes);
    return authRes;
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  const value: Auth = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
