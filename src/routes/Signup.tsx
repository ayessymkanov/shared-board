import { useContext, useState, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import Input from "../components/Input";
import Button from "../components/Button";
import { validate } from "../utils/validation";
import { gql } from "../__generated__";

const SIGNUP = gql(`
  mutation Signup($input: SignupInput) {
    signup(input: $input)
  }
`);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const {
    setIsAuthenticated = () => { },
    refetchMe,
    isAuthenticated,
  } = useContext(AuthContext);
  const [signup, { loading, client }] = useMutation(SIGNUP, {});

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    const errors = validate({
      email,
      password,
      name,
    });
    if (Object.keys(errors).length > 0) {
      return setFormErrors(errors);
    }
    try {
      await client.clearStore();
      const s = await signup({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      localStorage.setItem("token", s.data?.signup ?? "");
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
      <form onSubmit={handleSignup} noValidate className="flex flex-col my-4">
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={formErrors.name}
          className="mb-4"
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
          className="mb-4"
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formErrors.password}
          className="mb-4"
        />
        <Button isSubmit>{loading ? "Loading..." : "Sign up"}</Button>
      </form>
    </div>
  );
};

export default Signup;
