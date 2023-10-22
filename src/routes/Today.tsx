import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";
import PageTitle from "../components/PageTitle";

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
  const { data, loading } = useQuery(TODAY, {
    fetchPolicy: 'no-cache',
  });

  const renderCards = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return data?.today.map((card) => <CardComponent isList card={card as Card} />);
  }

  return (
    <div>
      <PageTitle>Here's what you have for today</PageTitle>
      <div className="flex flex-col gap-2">
        {renderCards()}
      </div>
    </div>
  );
}

export default Today;
