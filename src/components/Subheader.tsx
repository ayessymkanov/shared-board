import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DialogContext } from "./DialogProvider";

const routes = [
  "/team",
  "/personal",
];

const Subheader = () => {
  const { pathname } = useLocation();
  const { open } = useContext(DialogContext);

  const getTitle = () => {
    switch (pathname) {
      case "/team": {
        return "Team";
      }
      case "/personal": {
        return "Personal";
      }
      default: {
        return "";
      }
    }
  }

  const handleAddPersonalClick = () => {
    open("addPersonal", "Add Personal Card");
  }

  const renderControls = () => {
    if (pathname === "/personal") {
      return (
        <div className="flex justify-end">
          <a onClick={handleAddPersonalClick} className="font-sm text-sm text-blue-600 hover:cursor-pointer">+ Add Card to Personal board</a>
        </div>
      );
    }

    return null;
  }

  if (!routes.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full border-b py-3 px-4 flex justify-between">
      <div>{getTitle()}</div>
      {renderControls()}
    </div>
  );
}

export default Subheader;
