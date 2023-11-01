import { Formik, Form, Field, FieldProps, FormikValues } from "formik"
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import usePostRequest from "../utils/usePostRequest";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [forgotPassword, { data, error }] = usePostRequest('forgot');

  const handleSubmit = async ({ email }: FormikValues) => {
    try {
      await forgotPassword({ email });
    } catch (err) {
      console.log(err);
    }
  }

  if (data) {
    return (
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <div>Done! We sent you a link to reset your password.</div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
      <h2 className="text-xl font-semibold md:text-2xl mb-4">Restore password</h2>
      <p className="text-sm mb-4 text-gray-500">Please provide an email you used for sign up</p>
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
            {error && <span className="text-sm text-red-700">{error.message}</span>}
            <Button isSubmit>Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
