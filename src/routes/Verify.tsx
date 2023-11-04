import { Navigate, useNavigate, useParams } from "react-router-dom"
import { object, string } from "yup";
import PageWrapper from "../components/PageWrapper";
import { useContext, useEffect } from "react";
import usePostRequest from "../utils/usePostRequest";
import { AuthContext } from "../components/AuthProvider";
import { Formik, Form, FormikValues, Field, FieldProps } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";

const validationSchema = object().shape({
  email: string()
    .email('Must be a valid email')
    .required('Email is required'),
});
const Verify = () => {
  const { id } = useParams<{ id: string }>();
  const [verify, { data, loading, error }] = usePostRequest('verify');
  const [resend, { data: resendData, error: resendError }] = usePostRequest('resend');
  const {
    refetchMe,
    isAuthenticated,
    setIsAuthenticated = () => { },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await verify({
        verificationId: id,
      });
    })();
  }, [id]);

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data?.token);
      (async () => {
        if (refetchMe) {
          try {
            const { data } = await refetchMe();
            const isAuthenticated = !!data?.me?.email;
            setIsAuthenticated(isAuthenticated);
            navigate("/");
          } catch (err) {
            navigate('/signin')
          }
        }
      })();
    }
  }, [data, error]);

  const handleSubmit = async ({ email }: FormikValues) => {
    try {
      await resend({ email });
    } catch (err) {
      console.log(err);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }


  if (resendData) {
    return <div>Done! Please check your inbox</div>;
  }

  const renderForm = () => {
    return (
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <h2 className="text-xl font-semibold md:text-2xl mb-4">Link has expired</h2>
        <p className="text-sm mb-4 text-gray-500">Please provide an email to resend the confirmation link</p>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: ''
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2" noValidate>
              <Field name="name">
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
              {resendError && <span className="text-sm text-red-700">{resendError.message}</span>}
              <Button isSubmit>Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <PageWrapper loading={loading}>
      {error && renderForm()}
    </PageWrapper>
  );
}

export default Verify;
