import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { Card, TeamQuery, User } from "../../__generated__/graphql";

export const TEAM = gql(`
  query Team($id: Int!) {
    team(id: $id) {
      name
      id
      adminId
      cards {
        title
        id
        assigneeId
        createdAt
        teamId 
        status
        dueDateTime
        assignee {
          name
          email 
          id
        }
      }
      teamMembers {
        name
        email
        id
      }
    }
  }
`);

type Processed = Record<string, User & { cards: Array<Partial<Card>> }>;
type TeamData = TeamQuery["team"] & {
  columns: Processed;
}

const useTeam = (id: number) => {
  const { data, loading, error, refetch } = useQuery(TEAM, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });
  let teamData: TeamData = {} as TeamData;

  if (data) {
    const processed: Processed = {};

    for (const member of data?.team?.teamMembers ?? []) {
      const cards = data?.team?.cards.filter((card) => card && (card.assigneeId === Number(member.id))) || [];
      processed[member.id] = {
        ...member,
        cards,
      }
    }

    teamData = {
      ...data.team,
      columns: processed,
    } as TeamData;
  }

  return {
    teamData,
    loading,
    error,
    refetch,
  };
}

export default useTeam;
