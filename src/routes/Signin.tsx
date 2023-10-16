import { FormEvent, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { validate } from "../utils/validation";
import Input from "../components/Input";
import Link from "../components/Link";
import Button from "../components/Button";

const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input)
  }
`;

const Signin = () => {
  const [login, { loading, error }] = useMutation(LOGIN);
  const {
    refetchMe,
    isAuthenticated,
    setIsAuthenticated = () => {},
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    const errors = validate({
      email,
      password,
    });
    if (Object.keys(errors).length > 0) {
      return setFormErrors(errors);
    }
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
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
      <h2 className="text-xl font-semibold md:text-2xl">Sign in</h2>
      <p className="text-secondary">
        {"New here? "}
        <Link to="/join" replace>
          Create an account
        </Link>
      </p>
      <p className="text-red-400 my-3">{error?.message}</p>
      <form onSubmit={handleLogin} noValidate className="flex flex-col my-4">
        <Input
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
          className="mb-4"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formErrors.password}
          className="mb-4"
        />
        <Button isSubmit>{loading ? "Loading..." : "Sign in"}</Button>
      </form>
    </div>
  );
};

export default Signin;
