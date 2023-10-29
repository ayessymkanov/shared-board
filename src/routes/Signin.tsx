import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldProps, FormikValues } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../components/AuthProvider";
import Input from "../components/Input";
import Link from "../components/Link";
import Button from "../components/Button";
import usePostRequest from "../utils/usePostRequest";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Signin = () => {
  const [login, { error, data }] = usePostRequest('signin');
  const {
    refetchMe,
    isAuthenticated,
    setIsAuthenticated = () => { },
  } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("token", data?.token);
    (async () => {
      if (refetchMe) {
        const { data } = await refetchMe();
        const isAuthenticated = !!data?.me?.email;
        setIsAuthenticated(isAuthenticated);
      }
    })();
  }, [data]);

  const handleSubmit = async ({ email, password }: FormikValues) => {
    try {
      await login({ email, password })
    } catch (err) {
      console.error(err);
    }
  }

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
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-2" noValidate>
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
            <Button isSubmit>{isSubmitting ? "Loading..." : "Sign in"}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
