import { Formik, Form, Field, FormikValues } from "formik"
import * as Yup from "yup";
import Input from "./Input";
import { FC } from "react";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { useLocation } from "react-router-dom";

type Props = {
  close: () => void;
}

const ADD_TEAM_MEMBER = gql(`
  mutation AddTeamMember($input: AddTeamMemberInput!) {
    addTeamMember(input: $input)
  }
`);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Name is required'),
});

const AddTeamMemberForm: FC<Props> = ({ close }) => {
  const [addTeamMember, { client, error }] = useMutation(ADD_TEAM_MEMBER);
  const location = useLocation();
  const teamId = location.pathname.split("/").pop();

  const handleSubmit = async (values: FormikValues) => {
    try {
      await addTeamMember({
        variables: {
          input: {
            email: values.email,
            teamId: Number(teamId),
          }
        }
      });
      await client.refetchQueries({
        include: ["Team"]
      });
      close();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          <Field name="email">
            {({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Email"
                name="email"
                type="email"
                placeholder="ironman@avengers.com"
                error={touched.name ? errors.email as string : ""}
              />
            )}
          </Field>
          {error && <span className="text-sm text-red-700">{error.message}</span>}
          <Button isSubmit>{isSubmitting ? "Loading..." : "Submit"}</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddTeamMemberForm;
