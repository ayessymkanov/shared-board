import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { TEAM } from "./Team/useTeam";
import PageWrapper from "../components/PageWrapper";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";

const Personal = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(TEAM, {
    skip: !user?.personalBoardId,
    variables: {
      id: user?.personalBoardId ?? 0,
    },
    fetchPolicy: "no-cache",
  });

  const renderCards = () => {
    if (data?.team?.cards.length === 0) {
      return <div>You're all caught up!</div>;
    }
    return (
      <div className="flex flex-col gap-2">
        {data?.team?.cards.map((card) => <CardComponent isList card={card as Card} />)}
      </div>
    );
  }

  return (
    <PageWrapper loading={loading}>
      {renderCards()}
    </PageWrapper>
  );
}

export default Personal;
