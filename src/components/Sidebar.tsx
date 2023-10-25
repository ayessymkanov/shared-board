import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "../__generated__";

const TEAMS = gql(`
  query Teams {
    teams {
      name
      id
    }
  }
`);

const itemClassName = "flex items-center w-full p-2 text-white group hover:bg-blue-800";

const Sidebar = () => {
  const { data } = useQuery(TEAMS, {
    fetchPolicy: 'no-cache',
  });
  const [teamsHidden, setTeamsHidden] = useState(true);
  const toggleTeams = () => {
    setTeamsHidden((prev) => !prev);
  };
  const renderTeams = () => {
    if (!data?.teams || data?.teams.length === 0) {
      return null;
    }

    return (
      <ul className={`py-2 space-y-2 ${teamsHidden && "hidden"}`}>
        {data.teams.map((team) => {
          return (
            <li key={team.id}>
              <Link to={`/team/${team.id}`} className={itemClassName}>
                {team.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderTeamDropdown = () => {
    return (
      <li>
        <button
          type="button"
          className={itemClassName}
          onClick={toggleTeams}
        >
          <span className="flex-1 text-left whitespace-nowrap">
            Shared boards
          </span>
        </button>
        {renderTeams()}
      </li>
    );
  }

  return (
    <aside className="w-64 h-[calc(100vh_-_3rem)] bg-blue-900">
      <div className="flex w-full h-full py-4">
        <ul className="w-full">
          <li>
            <Link to="/" replace className={itemClassName}>
              My calendar
            </Link>
          </li>
          <li>
            <Link to="/personal" replace className={itemClassName}>
              Personal Board
            </Link>
          </li>
          {renderTeamDropdown()}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
