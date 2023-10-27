import { Navigate, useParams } from "react-router-dom";
import classnames from "classnames";
import TeamMemberColumn from "../../components/TeamMemberColumn";
import useTeam from "./useTeam";
import PageWrapper from "../../components/PageWrapper";

const Team = () => {
  const params = useParams<{ id: string }>();
  const { teamData, loading, error } = useTeam(Number(params.id ?? 0));

  if (error) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const className = classnames(`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4`);

  return (
    <PageWrapper loading={loading}>
      <div className={className}>
        {Object.keys(teamData.columns).map((m) => (
          <TeamMemberColumn
            key={teamData.columns[m].id}
            cards={teamData.columns[m].cards}
            title={teamData.columns[m].name}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Team;
