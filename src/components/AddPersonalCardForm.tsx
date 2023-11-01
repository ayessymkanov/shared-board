import { FC, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Formik, Field, FieldProps } from "formik";
import { object, string } from "yup";
import { gql } from "../__generated__";
import Button from "./Button";
import Input from "./Input";
import Datepicker from "./Datepicker";
import { AuthContext } from "./AuthProvider";

type Props = {
  close: () => void;
}

type FormValues = {
  title: string;
  date: string;
}

const ADD_CARD = gql(`
  mutation AddCard($input: AddCardInput!) {
    addCard(input: $input)
  }
`);

const validationSchema = object().shape({
  title: string()
    .required('Title is required'),
  date: string().required('Date is required').matches(/^(0[1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, "Date should follow MM/DD/YYYY format")
});

const AddPersonalCardForm: FC<Props> = ({ close }) => {
  const [addCard, { error, client }] = useMutation(ADD_CARD);
  const [formError, setFormError] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values: FormValues) => {
    console.log(values.date)
    try {
      await addCard({
        variables: {
          input: {
            title: values.title,
            teamId: user?.personalBoardId ?? 0,
            assigneeId: Number(user?.id ?? 0),
            dueDateTime: new Date(values.date).toISOString(),
          }
        }
      });
      if (error) {
        return setFormError(error.message)
      }
      await client.refetchQueries({
        include: ["Team", "Cards"]
      });
      close();
      setFormError("");
    } catch (error: any) {
      console.log(error)
      setFormError(error.message as string);
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: '',
        date: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-2">
          <Field name="title">
            {({ field }: FieldProps) => (
              <Input
                value={field.value as string}
                onChange={field.onChange}
                label="Title"
                name="title"
                type="text"
                placeholder="Save Captain America"
                error={touched.title ? errors.title : ""}
              />
            )}
          </Field>
          <Field name="date">
            {({ field }: FieldProps) => (
              <Datepicker
                value={field.value}
                onChange={field.onChange}
                setValue={(value: string) => { setFieldValue('date', value) }}
                label="Date"
                name="date"
                type="text"
                placeholder="MM-DD-YYYY"
                autoComplete="off"
                error={touched.date ? errors.date : ""}
              />
            )}
          </Field>
          <span className="text-sm text-red-700">{formError}</span>
          <Button isSubmit>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddPersonalCardForm;
