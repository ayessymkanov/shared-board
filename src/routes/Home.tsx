import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

const MY_TEAMS = gql`
  query GetTeams($userId: Int!) {
    teams(userId: $userId) {
      name
      id
      adminId
    }
  }
`;

type Team = {
  name: string;
  id: number;
  adminId: number;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(MY_TEAMS, {
    variables: {
      userId: Number(user?.id ?? 0),
    },
  });
  return (
    <div>
      <div>hello {user?.name}</div>
      <div>{data?.teams.map((team: Team) => team.name)}</div>
    </div>
  );
};

export default Home;
