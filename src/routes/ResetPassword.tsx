import { Formik, Form, Field, FieldProps, FormikValues } from "formik"
import Input from "../components/Input";
import Button from "../components/Button";
import usePostRequest from "../utils/usePostRequest";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Link from "../components/Link";

const ResetPassword = () => {
  const [validateReset, { data: validateData, error: validateError }] = usePostRequest('validateReset');
  const [resetPassword, { data: resetData, error: resetError }] = usePostRequest('reset');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      await validateReset({ id });
    })();
  }, []);

  const validateForm = (values: FormikValues) => {
    const errors: Record<string, string> = {

    }
    if (values.password !== values.confirmPassword) {
      errors.password = 'Passwords don\'t match';
      errors.confirmPassword = 'Passwords don\'t match';
    }

    return errors;
  }

  const handleSubmit = async ({ password }: FormikValues) => {
    try {
      if (validateData) {
        await resetPassword({
          email: validateData.email,
          password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (validateError) {
    return (
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <div>{validateError.message}</div>
      </div>
    );
  }

  if (resetData) {
    return (
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <div>Successfully reset your password!</div>
        <Link to="/signin" replace>Sign in</Link>
      </div>
    );
  }

  if (validateData) {
    return (
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <h2 className="text-xl font-semibold md:text-2xl mb-4">Reset password</h2>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2" noValidate>
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
              <Field name="confirmPassword">
                {({ field }: FieldProps) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    error={touched.confirmPassword ? errors.confirmPassword as string : ""}
                  />
                )}
              </Field>
              {resetError && <span className="text-sm text-red-700">{resetError.message}</span>}
              <Button isSubmit>Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    );

  }
}

export default ResetPassword;
