import { useQuery } from "@apollo/client";
import { FC, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { gql } from "../__generated__";
import classNames from "classnames";
import { AuthContext } from "./AuthProvider";
import Chevron from "./Chevron";
import { DialogContext } from "./DialogProvider";

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
  const { user } = useContext(AuthContext);
  const { open } = useContext(DialogContext);
  const { data } = useQuery(TEAMS, {
    fetchPolicy: 'no-cache',
  });
  const [teamsHidden, setTeamsHidden] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, hideSidebar);

  const toggleTeams = () => {
    setTeamsHidden((prev) => !prev);
  };

  const handleAddNewBoard = () => {
    hideSidebar();
    open({ name: "addBoard", title: "Create a new Shared Board" });
  }

  const renderTeams = () => {
    return (
      <ul className={`${teamsHidden && "hidden"}`}>
        <li onClick={handleAddNewBoard} className={itemClassName}>
          <a className="font-sm text-sm text-blue-600 hover:cursor-pointer">+ Add a new Shared Board</a>
        </li>
        {data?.teams.map((team) => {
          return (
            <li key={team.id} onClick={hideSidebar}>
              <Link to={`/team/${team.id}`} state={{ boardName: team.name }} className={classNames(itemClassName, "pl-4")}>
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
          className={classNames(itemClassName, "flex justify-between")}
          onClick={toggleTeams}
        >
          <span className="flex-1 text-left whitespace-nowrap">
            Shared boards
          </span>
          <Chevron isDown={!teamsHidden} />
        </button>
        {renderTeams()}
      </li>
    );
  }

  const className = classNames(
    "w-64 h-[calc(100vh_-_3rem)] overflow-y-auto bg-white transition-transform duration-200 absolute -left-64 z-10", {
    "translate-x-64 shadow border-r": isOpen,
  });

  return (
    <aside className={className} ref={ref}>
      <div className="flex flex-col w-full h-full py-4 gap-4">
        <span className="pl-2 text-base font-bold">Hello {user?.name}!</span>
        <ul className="w-full">
          {sidebarItems.map(({ to, title }) => (
            <li key={to} onClick={hideSidebar}>
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
