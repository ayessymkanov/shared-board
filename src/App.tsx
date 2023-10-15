import { FormEvent, useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { AuthContext } from "./components/AuthProvider";

const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input)
  }
`;

const Login = (props: { refetch: () => void }) => {
  const [login, { loading }] = useMutation(LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginData = await login({
        variables: { input: { email, password } },
      });
      localStorage.setItem("token", loginData.data.login);
      props.refetch();
    } catch (err) {
      console.log(err);
    }
  };

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

const ME = gql`
  query {
    me {
      name
      email
    }
  }
`;

function App() {
  const { data, error, refetch } = useQuery(ME);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (!error && data?.me.email) {
      setIsLoggedIn(true);
    }
  }, [error, data, setIsLoggedIn]);
  if (isLoggedIn) {
    return <div>home page</div>;
  }
  return <Login refetch={refetch} />;
}

export default App;
