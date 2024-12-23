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
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;
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
      console.log({ email, password });
      console.log(responseLogin.data.user.user_id);

      const responseGet = await api.get(
        `/users/id/${responseLogin.data.user.user_id}`
      );

      const userLogged = {
        user_id: responseGet.data.user_id,
        photo: responseGet.data.photo,
        user_type: responseGet.data.user_type,
        name: responseGet.data.name,
        phone: responseGet.data.phone,
        email: responseGet.data.email,
        cpf: responseGet.data.cpf,
        birthday: responseGet.data.birthday,
        password: responseGet.data.password,
        createdAt: responseGet.data.createdAt,
        updatedAt: responseGet.data.updatedAt,
        token: responseLogin.data.token,
        addressLine1: responseGet.data.addressLine1,
        addressLine2: responseGet.data.addressLine2,
        country: responseGet.data.country,
        state: responseGet.data.state,
        city: responseGet.data.city,
        neighborhood: responseGet.data.neighborhood,
        postalCode: responseGet.data.postalCode,
      };

      setUser(userLogged);
      //console.log(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error: any) {
      if (error.response) {
        console.error('Erro do servidor:', error.response.data);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        console.error('Erro na requisição:', error.message);
      }
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
