import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { AuthContext } from "./AuthProvider";

type Team = {
  name: string;
  id: number;
};

const TEAMS = gql`
  query {
    teams {
      name
      id
    }
  }
`;

const Sidebar = () => {
  const { data } = useQuery(TEAMS, {
    fetchPolicy: 'no-cache',
  });
  const [teamsHidden, setTeamsHidden] = useState(false);
  const { setIsAuthenticated = () => { } } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const toggleTeams = () => {
    setTeamsHidden((prev) => !prev);
  };
  const renderTeams = () => {
    if (!data) {
      return null;
    }

    return data.teams.map((team: Team) => {
      const className =
        "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";
      return (
        <li key={team.id}>
          <Link to={`/team/${team.id}`} className={className}>
            {team.name}
          </Link>
        </li>
      );
    });
  };

  const renderTeamDropdown = () => {
    return (
      <li>
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={toggleTeams}
        >
          <span className="flex-1 text-left whitespace-nowrap">
            My teams
          </span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <ul
          id="dropdown-example"
          className={`py-2 space-y-2 ${teamsHidden && "hidden"}`}
        >
          {renderTeams()}
        </ul>
      </li>
    );
  }

  const itemClassName =
    "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";
  return (
    <aside className="w-64 h-[calc(100vh_-_4rem)] transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex w-full h-full px-1 py-4 overflow-y-auto border-r">
        <ul className="space-y-2 font-medium w-full">
          <li>
            <Link to="/" replace className={itemClassName}>
              My calendar
            </Link>
          </li>
          <li>
            <Link to="/today" replace className={itemClassName}>
              Today
            </Link>
          </li>
          <li>
            <Link to="/personal" replace className={itemClassName}>
              Personal
            </Link>
          </li>
          {renderTeamDropdown()}
          <li>
            <button
              className={classnames(itemClassName, "text-red-700")}
              onClick={handleLogout}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
