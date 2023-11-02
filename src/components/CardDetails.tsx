import { FC } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

type Props = {
  id: string;
}

const CARD = gql(`
  query Card($cardId: String!) {
    card(id: $cardId) {
      id 
      title
      description
      status
      dueDateTime
      assignee {
        name
        email
        id
      }
    }
  }
`);

const CardDetails: FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(CARD, {
    variables: {
      cardId: id,
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>cannot load card details</div>;
  }

  const { title, description, dueDateTime, assignee: { name } } = data.card;
  console.log(data.card)

  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <div>{description}</div>
      <div>{dueDateTime}</div>
      <div>{name}</div>

    </div>
  );
}

export default CardDetails;
