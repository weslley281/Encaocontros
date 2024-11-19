import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  user_id: number;
  photo: string;
  user_type: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  password: string;
}

interface IAuthContextData {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@tokenEncaoContros:user';

  async function signIn(email: string, password: string) {
    try {
      const responseLogin = await api.post('/users/auth', { email, password });
      const responseGet = await api.get(
        `/users/id/${responseLogin.data.id_dojo}`
      );

      const userLogged = {
        user_id: responseLogin.data.user_id,
        photo: responseLogin.data.photo,
        user_type: responseLogin.data.user_type,
        name: responseLogin.data.name,
        phone: responseLogin.data.phone,
        email: responseLogin.data.email,
        cpf: responseLogin.data.cpf,
        birthday: responseLogin.data.birthday,
        password: responseLogin.data.password,
        createdAt: responseGet.data.createdAt,
        updatedAt: responseGet.data.updatedAt,
        token: responseLogin.data.token,
      };

      setUser(userLogged);
      console.log(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
