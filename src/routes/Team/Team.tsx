import { useParams } from "react-router-dom";
import classnames from "classnames";
import TeamMemberColumn from "../../components/TeamMemberColumn";
import useTeam from "./useTeam";

const Team = () => {
  const params = useParams<{ id: string }>();
  const { teamData, loading } = useTeam(Number(params.id ?? 0));

  if (loading) {
    return <div>Loading...</div>;
  }

  const className = classnames(`grid grid-cols-3 gap-4`);

  return (
    <div className={className}>
      {Object.keys(teamData.columns).map((m) => (
        <TeamMemberColumn
          cards={teamData.columns[m].cards}
          title={teamData.columns[m].name}
        />
      ))}
    </div>
  );
};

export default Team;
