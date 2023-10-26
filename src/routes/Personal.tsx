import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { TEAM } from "./Team/useTeam";
import PageWrapper from "../components/PageWrapper";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";
import { useMediaQuery } from "usehooks-ts";
import classNames from "classnames";

const Personal = () => {
  const matchesSmall = useMediaQuery('(max-width: 767px)');
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

    const className = classNames(
      "grid grid-cols-1 gap-4",
      "md:grid-cols-2",
      "lg:grid-cols-4"
    );
    console.log({ matchesSmall })

    return (
      <div className={className}>
        {data?.team?.cards.map((card) => <CardComponent isList={matchesSmall} card={card as Card} />)}
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
