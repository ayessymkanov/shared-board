import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import type { ApolloQueryResult } from "@apollo/client";
import LoadingOverlay from "./LoadingOverlay";

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
  const { data, refetch, networkStatus, error, loading } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready) {
      setIsAuthenticated(Boolean(data));
      setUser(data?.me);
    } else if (error) {
      setIsAuthenticated(false);
    }
  }, [networkStatus, data, error, loading]);

  const renderChildren = () => {
    if (networkStatus === NetworkStatus.loading) {
      return <LoadingOverlay />;
    }

    return children;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, refetchMe: refetch }}
    >
      {renderChildren()}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
