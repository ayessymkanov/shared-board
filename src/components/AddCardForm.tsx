import { gql } from "../__generated__/gql";
import { useMutation } from "@apollo/client";
import { FC } from "react";

type Props = {
  closeModal: () => void;
}
const ADD_CARD = gql(`
  mutation AddCard($input: AddCardInput!) {
    addCard(input: $input)
  }
`);

const AddCardForm: FC<Props> = ({ closeModal }) => {
  const [addCard] = useMutation(ADD_CARD);
  console.log(addCard);
  const handleSubmit = () => {
    closeModal();

  }
  return (
    <form onSubmit={handleSubmit}></form>
  );
}

export default AddCardForm;
