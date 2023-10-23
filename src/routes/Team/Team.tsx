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

  const className = classnames(`grid lg:grid-cols-3 gap-4 md:grid-cols-1`);

  return (
    <PageWrapper title={`${teamData.name} board`} loading={loading}>
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
