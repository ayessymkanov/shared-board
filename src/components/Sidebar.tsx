import { useQuery } from "@apollo/client";
import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "../__generated__";
import classNames from "classnames";

const TEAMS = gql(`
  query Teams {
    teams {
      name
      id
    }
  }
`);

const sidebarItems: { to: string, title: string }[] = [
  { to: "/", title: "Calendar" },
  { to: "/personal", title: "Personal" },
];

const itemClassName = "flex items-center font-light w-full p-2 group hover:bg-gray-100";

type Props = {
  isOpen?: boolean;
  hideSidebar: () => void;
}

const Sidebar: FC<Props> = ({ isOpen, hideSidebar }) => {
  const { data } = useQuery(TEAMS, {
    fetchPolicy: 'no-cache',
  });
  const [teamsHidden, setTeamsHidden] = useState(true);
  const ref = useRef(null);

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

  const className = classNames("w-64 h-[calc(100vh_-_3rem)] overflow-y-auto bg-white transition-transform duration-200 absolute -left-64 z-10", {
    "translate-x-64 shadow border-r": isOpen,
  });

  return (
    <aside className={className} ref={ref}>
      <div className="flex w-full h-full py-4">
        <ul className="w-full">
          {sidebarItems.map(({ to, title }) => (
            <li onClick={hideSidebar}>
              <Link to={to} replace className={itemClassName}>
                {title}
              </Link>
            </li>
          ))}
          {renderTeamDropdown()}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
