import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import type { ApolloQueryResult } from "@apollo/client";

type MeType = {
  email: string;
  name: string;
  id: number;
};

type AuthContextType = {
  isAuthenticated?: boolean;
  user?: MeType;
  setIsAuthenticated?: (isLoggedIn: boolean) => void;
  refetchMe?: () => Promise<ApolloQueryResult<{ me?: MeType }>>;
};

type Props = {
  children: ReactNode;
};

const ME = gql`
  query {
    me {
      name
      email
      id
    }
  }
`;

export const AuthContext = createContext<AuthContextType>({});

const AuthProvider: FC<Props> = ({ children }) => {
  const { data, error, refetch } = useQuery(ME);
  const [isAuthenticated, setIsAuthenticated] = useState(!error && data);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setIsAuthenticated(!error && data);
    setUser(data?.me);
  }, [error, data]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, refetchMe: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
