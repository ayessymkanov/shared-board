import { useQuery, gql } from "@apollo/client";

const TEAM = gql`
  query team($id: Int!) {
    team(id: $id) {
      name
      id
      adminId
      cards {
        title
        id
        assigneeId
        assignee {
          name
        }
      }
      teamMembers {
        name
        email
        id
      }
    }
  }
`;

type Card = {
  title: string;
  assigneeId: number;
  id: string;
}

type MemberWithCard = {
  name: string;
  email: string;
  id: number;
  cards: Array<Card>;
}

type Processed = Record<number, MemberWithCard>;

const processData = (data: any): Processed => {
  const processed = {};

  for (const member of data.teamMembers) {
    processed[member.id] = {
      ...member,
      cards: data.cards.filter((card) => card.assigneeId === Number(member.id)),
    }
  }

  return processed;
}
const useTeam = (id: number) => {
  const { data, loading, error } = useQuery(TEAM, {
    variables: { id },
  });
  let teamData = {};

  if (data) {
    teamData = {
      ...data.team,
      columns: processData(data.team),
    };
  }


  return {
    teamData,
    loading,
    error,
  };
}

export default useTeam;