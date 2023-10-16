import { useContext, useState, FormEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const SIGNUP = gql`
  mutation Signup($input: SignupInput) {
    signup(input: $input)
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsAuthenticated = () => {},
    refetchMe,
    isAuthenticated,
  } = useContext(AuthContext);
  const [signup, { loading }] = useMutation(SIGNUP, {});

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const s = await signup({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      localStorage.setItem("token", s.data.signup);
      if (refetchMe) {
        const { data } = await refetchMe();
        const isAuthenticated = !!data?.me?.email;
        setIsAuthenticated(isAuthenticated);
      }
      console.log(s);
    } catch (err) {
      console.log(err);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/board" replace />;
  }

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button type="submit">{loading ? "loading..." : "signup"}</button>
    </form>
  );
};

export default Signup;
