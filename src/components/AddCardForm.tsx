import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { gql } from "../__generated__";
import Button from "./Button";
import Input from "./Input";
import Datepicker from "./Datepicker";
import SelectInput from "./SelectInput";

type FormValues = {
  title: string;
  team: string;
  assignee: string;
  date: string;
}

type Props = {
  close: () => void;
  initialValues?: Partial<FormValues>;
}

const ADD_CARD = gql(`
  mutation AddCard($input: AddCardInput!) {
    addCard(input: $input)
  }
`);

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Title is required'),
  assignee: Yup.string()
    .email('Invalid email')
    .required('Assignee email is required'),
  team: Yup.string(),
  date: Yup.string().required('Date is required').matches(/^(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])\-(19|20)\d{2}$/, "Date should follow MM-DD-YYYY format")
});

const AddCardForm: FC<Props> = ({ close, initialValues }) => {
  const [addCard, { error, client }] = useMutation(ADD_CARD);
  const [formError, setFormError] = useState("");
  console.log({ initialValues })
  const handleSubmit = async (values: FormValues) => {
    try {
      await addCard({
        variables: {
          input: {
            title: values.title,
            assigneeId: Number(values.assignee),
            teamId: Number(values.team),
            dueDateTime: new Date(values.date).toISOString(),
          }
        }
      });
      if (error) {
        return setFormError(error.message)
      }
      await client.refetchQueries({
        include: ["Team"]
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
        title: initialValues?.title ?? '',
        assignee: initialValues?.assignee ?? '',
        date: initialValues?.date ?? '',
        team: initialValues?.team ?? '',
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-2">
          <Field
            name="title"
          >
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
          <Field
            name="assignee"
          >
            {({ field }: FieldProps) => (
              <SelectInput
                value={field.value as string}
                onChange={field.onChange}
                label="Assignee"
                name="assignee"
                type="text"
                placeholder="ironman@avengers.com"
                error={touched.assignee ? errors.assignee : ""}
                options={[]}
              />
            )}
          </Field>
          <Field
            name="team"
          >
            {({ field }: FieldProps) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Team"
                name="team"
                type="text"
                placeholder="Avengers"
                error={touched.team ? errors.team : ""}
                disabled={!!initialValues?.team}
              />
            )}
          </Field>
          <Field
            name="date"
          >
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

export default AddCardForm;
