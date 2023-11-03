import { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik, Field, FieldProps } from "formik";
import { object, string } from "yup";
import { gql } from "../__generated__";
import Button from "./Button";
import Input from "./Input";
import Datepicker from "./Datepicker";
import SelectInput from "./SelectInput";
import { Option } from "./SelectInput/SelectInput";

type FormValues = {
  title: string;
  team: string;
  assignee: { label: string, value: number }
  date: string;
  description: string;
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

const TEAM_MEMBERS = gql(`
  query TeamMembers($teamId: Int!) {
    teamMembers(id: $teamId) {
      name
      id
      email
    }
  }
`);

const validationSchema = object().shape({
  title: string()
    .required('Title is required'),
  description: string()
    .max(200, 'Please keep description under 200 chars'),
  assignee: object()
    .required('Assignee is required'),
  team: string(),
  date: string().required('Date is required').matches(/^(0[1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, "Date should follow MM/DD/YYYY format")
});

const AddCardForm: FC<Props> = ({ close, initialValues }) => {
  const [addCard, { error, client }] = useMutation(ADD_CARD);
  const { data: team } = useQuery(TEAM_MEMBERS, {
    skip: !initialValues?.team,
    variables: {
      teamId: Number(initialValues?.team ?? 0)
    }
  });
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values: FormValues) => {
    try {
      await addCard({
        variables: {
          input: {
            title: values.title,
            assigneeId: Number(values.assignee.value),
            teamId: Number(values.team),
            dueDateTime: new Date(values.date).toISOString(),
            description: values.description,
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
        assignee: initialValues?.assignee ?? { label: '', value: 0 },
        date: initialValues?.date ?? '',
        team: initialValues?.team ?? '',
        description: '',
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
                placeholder="Add card title"
                error={touched.title ? errors.title : ""}
              />
            )}
          </Field>
          <Field name="description">
            {({ field }: FieldProps) => (
              <Input
                value={field.value as string}
                onChange={field.onChange}
                label="Description"
                name="description"
                type="textarea"
                placeholder="Add card description"
                error={touched.description ? errors.description : ""}
              />
            )}
          </Field>
          <Field name="assignee">
            {({ field }: FieldProps) => (
              <SelectInput
                value={field.value}
                onChange={field.onChange}
                onSetValue={(value: Option) => setFieldValue('assignee', value)}
                label="Assignee"
                name="assignee"
                type="text"
                placeholder="email@example.com"
                // error={touched.assignee ? errors.assignee : ""}
                options={team?.teamMembers.map((member) => ({ label: `${member.name} | ${member.email}`, value: member.id })) ?? []}
              />
            )}
          </Field>
          {!initialValues?.team && (
            <Field name="team">
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
          )}
          <Field name="date">
            {({ field }: FieldProps) => (
              <Datepicker
                value={field.value}
                onChange={field.onChange}
                setValue={(value: string) => { setFieldValue('date', value) }}
                label="Date"
                name="date"
                type="text"
                placeholder="MM/DD/YYYY"
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
