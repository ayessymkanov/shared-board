import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DialogContext } from "./DialogProvider";

const NO_SUBHEADER_ROUTES = [
  "/",
  "/signin",
  "/join"
];

const linkClassName = "font-sm text-sm text-blue-600 hover:cursor-pointer";

const Subheader = () => {
  const { pathname, state } = useLocation();
  const { open } = useContext(DialogContext);

  const handleAddPersonalClick = () => {
    open("addPersonal", "Add Personal Card");
  }

  const handleAddTeamCardClick = () => {
    open("addTeamCard", `Add card to ${state?.boardName}`);
  }

  const handleInvite = () => {
    open("invite", "Invite a Member");
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
            {/* <a onClick={handleAddTeamCardClick} className={linkClassName}>+ Add Card</a> */}
            {/* <a onClick={handleInvite} className={linkClassName}>+ Invite a Member</a> */}
          </div>
        </div>
      );
    }

    return null;
  }

  if (NO_SUBHEADER_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full border-b py-3 px-4">
      {renderContent()}
    </div>
  );
}

export default Subheader;
