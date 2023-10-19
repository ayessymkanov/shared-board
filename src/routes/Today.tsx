import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";

const TODAY = gql(`
  query Today {
    today {
      title
      status
      dueDateTime
      createdAt
      id
    }
  }
`);

const Today = () => {
  const { data } = useQuery(TODAY);

  const renderCards = () => {
    return data?.today.map((card) => <CardComponent isList card={card as Card} />);
  }

  return (
    <div>
      <div>today</div>
      {renderCards()}
    </div>
  );
}

export default Today;
