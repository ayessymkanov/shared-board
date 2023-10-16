import { FormEvent, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input)
  }
`;

const Signin = () => {
  const [login, { loading }] = useMutation(LOGIN);
  const {
    refetchMe,
    isAuthenticated,
    setIsAuthenticated = () => {},
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginData = await login({
        variables: { input: { email, password } },
      });
      localStorage.setItem("token", loginData.data.login);
      if (refetchMe) {
        const { data } = await refetchMe();
        const isAuthenticated = !!data?.me?.email;
        setIsAuthenticated(isAuthenticated);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/board" replace />;
  }

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleLogin}>
        {loading ? "loading..." : "login"}
      </button>
    </div>
  );
};

export default Signin;
