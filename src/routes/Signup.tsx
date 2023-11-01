import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldProps, FormikValues } from "formik";
import { object, string } from "yup";
import { AuthContext } from "../components/AuthProvider";
import Input from "../components/Input";
import Button from "../components/Button";
import usePostRequest from "../utils/usePostRequest";

const validationSchema = object().shape({
  email: string()
    .email()
    .required('Email is required'),
  password: string()
    .required('Password is required'),
  name: string()
    .required('Name is required'),
});

const containerClassname = "w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12";

const Signup = () => {
  const {
    setIsAuthenticated = () => { },
    refetchMe,
    isAuthenticated,
  } = useContext(AuthContext);
  const [signup, { data, error }] = usePostRequest('signup');

  useEffect(() => {
    (async () => {
      if (refetchMe) {
        const { data } = await refetchMe();
        const isAuthenticated = !!data?.me?.email;
        setIsAuthenticated(isAuthenticated);
      }
    })();
  }, [data]);

  const handleSubmit = async ({ name, email, password }: FormikValues) => {
    try {
      await signup({ name, email, password });
    } catch (err) {
      console.error(err);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (data) {
    return (
      <div className={containerClassname}>
        <div>Nice! Please check your inbox to confirm your email address</div>
      </div>
    );
  }

  return (
    <div className={containerClassname}>
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
