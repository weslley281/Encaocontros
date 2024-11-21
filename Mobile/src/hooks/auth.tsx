import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';

// Define a tipagem para as propriedades do `AuthProvider`.
interface AuthProviderProps {
  children: ReactNode; // O componente espera receber componentes filhos.
}

// Define a estrutura de um usuário com todas as suas propriedades.
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

// Define a interface para o contexto de autenticação.
// `IAuthContextData` descreve as propriedades e métodos que serão fornecidos.
interface IAuthContextData {
  user: User; // Representa o usuário autenticado.
  signIn: (email: string, password: string) => Promise<void>; // Método para login.
  signOut: () => Promise<void>; // Método para logout.
  userStorageLoading: boolean; // Indica se os dados do usuário ainda estão sendo carregados.
}

// Cria o contexto de autenticação com um valor inicial vazio do tipo `IAuthContextData`.
const AuthContext = createContext({} as IAuthContextData);

// Define o provedor de autenticação que envolverá os componentes filhos.
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  // Estado que armazena os dados do usuário autenticado.

  const [userStorageLoading, setUserStorageLoading] = useState(true);
  // Estado que indica se os dados do usuário armazenados estão sendo carregados.

  const userStorageKey = '@tokenEncaoContros:user';
  // Chave usada no AsyncStorage para salvar os dados do usuário.

  // Método para autenticar o usuário.
  async function signIn(email: string, password: string) {
    try {
      // Faz uma requisição de login para a API com e-mail e senha.
      const responseLogin = await api.post('/users/auth', { email, password });

      // Após autenticar, busca os dados detalhados do usuário.
      const responseGet = await api.get(
        `/users/id/${responseLogin.data.user_id}`
      );

      // Monta o objeto `userLogged` com os dados do usuário autenticado.
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
        token: responseLogin.data.token, // Token de autenticação.
      };

      setUser(userLogged); // Atualiza o estado do usuário.
      console.log(userLogged); // Loga os dados do usuário (útil para debugging).

      // Salva os dados do usuário no armazenamento local como string JSON.
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error) {
      // Lança um erro caso algo falhe.
      throw new Error(String(error));
    }
  }

  // Método para deslogar o usuário.
  async function signOut() {
    setUser({} as User); // Reseta o estado do usuário.
    await AsyncStorage.removeItem(userStorageKey); // Remove os dados do usuário do AsyncStorage.
  }

  // `useEffect` para carregar os dados do usuário do AsyncStorage quando o app inicia.
  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);
      // Tenta buscar os dados armazenados do usuário.

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        // Se existir, parseia o JSON para um objeto e atualiza o estado.

        setUser(userLogged);
      }

      setUserStorageLoading(false); // Indica que o carregamento foi concluído.
    }

    loadUserStorageData(); // Chama a função ao montar o componente.
  }, []); // Executa apenas uma vez (com array de dependências vazio).

  // Retorna o contexto para os componentes filhos com os valores e métodos necessários.
  return (
    <AuthContext.Provider
      value={{
        user, // Dados do usuário.
        signIn, // Método de login.
        signOut, // Método de logout.
        userStorageLoading, // Estado de carregamento.
      }}
    >
      {children} {/* Renderiza os componentes filhos dentro do provedor. */}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de autenticação.
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// Exporta o provedor e o hook para serem usados em outros componentes.
export { AuthProvider, useAuth };