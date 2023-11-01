import { Formik, Form, Field, FieldProps, FormikValues } from "formik"
import { object, string } from "yup";
import Input from "./Input";
import { FC } from "react";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { useNavigate } from "react-router-dom";

const ADD_TEAM = gql(`
  mutation AddTeam($input: AddTeamInput!) {
    addTeam(input: $input) {
      name
      id
    }
  }
`);

type Props = {
  close: () => void;
}

const validationSchema = object().shape({
  name: string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Name is required'),
});

const AddBoardForm: FC<Props> = ({ close }) => {
  const [addTeam, { error, client }] = useMutation(ADD_TEAM);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormikValues) => {
    try {
      const { data } = await addTeam({
        variables: {
          input: {
            name: values.name
          }
        }
      });
      await client.refetchQueries({
        include: ["Teams"]
      });
      close();
      navigate(`/team/${data?.addTeam.id}`, { state: { boardName: data?.addTeam.name } });
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
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-2">
          <Field
            name="name"
          >
            {({ field }: FieldProps) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Name"
                name="name"
                type="text"
                placeholder="Avengers"
                error={touched.name ? errors.name as string : ""}
              />
            )}
          </Field>
          {error && <span className="text-sm text-red-700">{error.message}</span>}
          <Button isSubmit>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddBoardForm;
