import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { TEAM } from "./Team/useTeam";
import PageWrapper from "../components/PageWrapper";


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
    return null;
  }

  return (
    <PageWrapper loading={loading}>
      {renderCards()}
    </PageWrapper>
  );
}

export default Personal;
