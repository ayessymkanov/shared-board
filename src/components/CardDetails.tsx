import { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik, Field, FieldProps, FormikValues } from "formik";
import { object, string } from "yup";
import Input from "./Input";
import Datepicker from "./Datepicker";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { gql } from "../__generated__";
import { Option } from "./SelectInput/SelectInput";
import { Status } from "../__generated__/graphql";
import { getStatusLabel } from "../utils/render";

type Props = {
  id: string;
  close: () => void;
}

const UPDATE_CARD = gql(`
  mutation UpdateCard($updateCardId: ID!, $input: UpdateCardInput) {
    updateCard(id: $updateCardId, input: $input)
  }
`);

const CARD = gql(`
  query Card($cardId: String!) {
    card(id: $cardId) {
      id 
      title
      description
      status
      dueDateTime
      team {
        name
        id
        teamMembers {
          email 
          name 
          id
        }
      }
      assignee {
        name
        email
        id
      }
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

const CardDetails: FC<Props> = ({ id, close }) => {
  const [editingMode, setEditingMode] = useState(false);
  const { data, loading, error: cardError } = useQuery(CARD, {
    variables: {
      cardId: id,
    }
  });
  const [updateCard, { error, client }] = useMutation(UPDATE_CARD);

  const editMode = () => {
    setEditingMode(true);
  }

  const handleSubmit = async (values: FormikValues) => {
    try {
      await updateCard({
        variables: {
          updateCardId: id,
          input: {
            title: values.title,
            assigneeId: Number(values.assignee.value),
            teamId: Number(data?.card.team.id),
            dueDateTime: new Date(values.date).toISOString(),
            description: values.description,
            status: values.status.value,
          }
        }
      });
      await client.refetchQueries({
        include: ["Team", "Card", "GetCards"]
      });
      close();
    } catch (error: any) {
      console.log(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (cardError || !data) {
    return <div>cannot load card details</div>;
  }

  const { title, description, dueDateTime, assignee: { name, id: userId }, team, status } = data.card;
  const date = new Date(Number(dueDateTime));

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title,
        assignee: { label: name, value: userId },
        date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
        team: team.name,
        description,
        status: { label: getStatusLabel(status), value: status },
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, resetForm }) => (
        <Form className="flex flex-col gap-2">
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="sm:w-4/6 flex flex-col gap-2">
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
                    editingMode={editingMode}
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
                    editingMode={editingMode}
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
                    editingMode={editingMode}
                  />
                )}
              </Field>

            </div>
            <div className="sm:w-2/6 flex flex-col gap-2">
              <Field name="team">
                {({ field }: FieldProps) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Team"
                    name="team"
                    type="text"
                    placeholder="Team"
                    // error={touched.team ? errors.team : ""}
                    disabled
                    editingMode={editingMode}
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
                    placeholder="MM/DD/YYYY"
                    autoComplete="off"
                    error={touched.date ? errors.date : ""}
                    editingMode={editingMode}
                  />
                )}
              </Field>
              <Field name="status">
                {({ field }: FieldProps) => {
                  const options = [
                    {
                      label: 'New',
                      value: Status.Open,
                    },
                    {
                      label: 'In Progress',
                      value: Status.InProgress
                    },
                    {
                      label: 'Done',
                      value: Status.Done,
                    }
                  ];
                  return (
                    <SelectInput
                      value={field.value}
                      onChange={field.onChange}
                      onSetValue={(value: Option) => setFieldValue('status', value)}
                      label="Status"
                      name="status"
                      type="text"
                      // error={touched.assignee ? errors.assignee : ""}
                      options={options}
                      editingMode={editingMode}
                    />
                  )
                }}
              </Field>
            </div>
          </div>
          {error && <span className="text-sm text-red-700">{error.message}</span>}
          <div className="w-full flex gap-2 justify-end">
            {editingMode
              ? <Button type="outlined" onClick={() => {
                resetForm({
                  values: {
                    title,
                    assignee: { label: name, value: userId },
                    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                    team: team.name,
                    description,
                    status: { label: status, value: status },
                  }
                });
                setEditingMode(false);
              }}>Cancel</Button>
              : <Button type="outlined" onClick={editMode}>Edit</Button>
            }
            <Button isSubmit>Submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CardDetails;
