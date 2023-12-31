import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DialogContext } from "./DialogProvider";
import { getCurrentRoute } from "../utils/routing";

const NO_SUBHEADER_ROUTES = [
  "",
  "signin",
  "join",
  "verify",
  "forgot",
  "reset"
];

const linkClassName = "font-sm text-sm text-blue-600 hover:cursor-pointer";

const Subheader = () => {
  const location = useLocation();
  const { pathname, state } = location;
  const { open } = useContext(DialogContext);

  const handleAddPersonalClick = () => {
    open({ name: "addPersonal", title: "Add Personal Card" });
  }

  const handleAddTeamCardClick = () => {
    open({ name: "addTeamCard", title: `Add card to ${state?.boardName}` });
  }

  const handleInvite = () => {
    open({ name: "invite", title: "Invite a Member" });
  }

  const renderContent = () => {
    if (pathname === "/personal") {
      return (
        <div className="w-full flex justify-between items-center">
          <span>Personal</span>
          <a onClick={handleAddPersonalClick} className={linkClassName}>+ Add Card to Personal board</a>
        </div>
      );
    }

    if (pathname.includes("team")) {
      return (
        <div className="w-full flex justify-between items-center">
          <span>{state?.boardName}</span>
          <div className="flex gap-2">
            <a onClick={handleAddTeamCardClick} className={linkClassName}>+ Add Card</a>
            <a onClick={handleInvite} className={linkClassName}>+ Invite a Member</a>
          </div>
        </div>
      );
    }

    return null;
  }

  if (NO_SUBHEADER_ROUTES.includes(getCurrentRoute(pathname))) {
    return null;
  }

  return (
    <div className="w-full border-b py-3 px-4">
      {renderContent()}
    </div>
  );
}

export default Subheader;
