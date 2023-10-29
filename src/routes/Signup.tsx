import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldProps, FormikValues } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../components/AuthProvider";
import Input from "../components/Input";
import Button from "../components/Button";
import { gql } from "../__generated__";

const SIGNUP = gql(`
  mutation Signup($input: SignupInput) {
    signup(input: $input)
  }
`);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  name: Yup.string()
    .required('Name is required'),
});

const Signup = () => {
  const {
    setIsAuthenticated = () => { },
    refetchMe,
    isAuthenticated,
  } = useContext(AuthContext);
  const [signup, { client, error }] = useMutation(SIGNUP, {});

  const handleSubmit = async ({ name, email, password }: FormikValues) => {
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
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
      <h2 className="text-xl font-semibold md:text-2xl mb-4">Sign up</h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-2" noValidate>
            <Field name="name">
              {({ field }: FieldProps) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Name"
                  name="name"
                  type="text"
                  error={touched.name ? errors.name as string : ""}
                />
              )}
            </Field>
            <Field name="email">
              {({ field }: FieldProps) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email ? errors.email as string : ""}
                />
              )}
            </Field>
            <Field name="password">
              {({ field }: FieldProps) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Password"
                  name="password"
                  type="password"
                  error={touched.password ? errors.password as string : ""}
                />
              )}
            </Field>
            <p className="text-sm text-red-400 my-1">{error?.message}</p>
            <Button isSubmit>{isSubmitting ? "Loading..." : "Sign up"}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
