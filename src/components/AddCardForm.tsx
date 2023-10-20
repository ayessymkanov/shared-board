import { gql } from "../__generated__/gql";
import { useMutation } from "@apollo/client";
import { FC, FormEvent } from "react";
import Button from "./Button";

type Props = {
  close: () => void;
}
const ADD_CARD = gql(`
  mutation AddCard($input: AddCardInput!) {
    addCard(input: $input)
  }
`);

const AddCardForm: FC<Props> = ({ close }) => {
  const [addCard] = useMutation(ADD_CARD);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(addCard);
    close();
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>add card form</div>
      <Button isSubmit>Submit</Button>
    </form>
  );
}

export default AddCardForm;
