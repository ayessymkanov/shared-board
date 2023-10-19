import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import type { ApolloQueryResult } from "@apollo/client";
import LoadingOverlay from "./LoadingOverlay";
import { gql } from "../__generated__/gql";
import { User } from "../__generated__/graphql";

type AuthContextType = {
  isAuthenticated?: boolean;
  user?: User;
  setIsAuthenticated?: (isLoggedIn: boolean) => void;
  refetchMe?: () => Promise<ApolloQueryResult<{ me?: User }>>;
};

type Props = {
  children: ReactNode;
};

const ME = gql(`
  query Me{
    me {
      name
      email
      id
    }
  }
`);

export const AuthContext = createContext<AuthContextType>({});

const AuthProvider: FC<Props> = ({ children }) => {
  const { data, refetch, networkStatus, error } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready) {
      setIsAuthenticated(Boolean(data));
      setUser(data?.me);
    } else if (error) {
      setIsAuthenticated(false);
    }
  }, [networkStatus, data, error]);

  const renderChildren = () => {
    if (networkStatus === NetworkStatus.loading) {
      return <LoadingOverlay />;
    }

    if (
      (networkStatus === NetworkStatus.error && error && !isAuthenticated) ||
      (networkStatus === NetworkStatus.ready && data && isAuthenticated)
    ) {
      return children;
    }
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
