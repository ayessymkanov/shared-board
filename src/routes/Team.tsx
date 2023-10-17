import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const TEAM = gql`
  query team($id: Int!) {
    team(id: $id) {
      name
      id
      adminId
      cards {
        title
        assignee {
          name
        }
      }
      teamMembers {
        name
        email
      }
    }
  }
`;

const Team = () => {
  const params = useParams<{ id: string }>();
  const { data, loading } = useQuery(TEAM, {
    variables: { id: Number(params.id) },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <div>{data.team.name}</div>;
  }

  return <div>team</div>;
};

export default Team;
