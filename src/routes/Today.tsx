import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";
import PageWrapper from "../components/PageWrapper";

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

  return (
    <PageWrapper title="Here's what you have for today" loading={loading}>
      <div className="flex flex-col gap-2">
        {data?.today.map((card) => <CardComponent isList card={card as Card} />)}
      </div>
    </PageWrapper>
  );
}

export default Today;
