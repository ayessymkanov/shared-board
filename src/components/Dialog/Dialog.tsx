import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DialogContext } from "../DialogProvider";
import AddCardForm from "../AddCardForm";
import "./styles.css";
import AddPersonalCardForm from "../AddPersonalCardForm";
import AddBoardForm from "../AddBoardForm";
import AddTeamMemberForm from "../AddTeamMemberForm";
import CardDetails from "../CardDetails";
import classNames from "classnames";

const Dialog = () => {
  const { isOpen, close, metadata } = useContext(DialogContext);
  const location = useLocation();

  const renderDialogContent = () => {
    switch (metadata?.name) {
      case 'addTeamCard': {
        const teamId = location.pathname.split("/").pop();
        return <AddCardForm close={close} initialValues={{ team: teamId }} />;
      }
      case 'addPersonal': {
        return <AddPersonalCardForm close={close} />;
      }
      case 'addBoard': {
        return <AddBoardForm close={close} />;
      }
      case 'invite': {
        return <AddTeamMemberForm close={close} />;
      }
      case 'openCard': {
        return <CardDetails id={metadata.id} />;
      }
    }
  }

  const className = classNames("absolute top-20 w-11/12 sm:w-96 shadow-backdrop rounded", {
    "sm:w-2/4": metadata?.name === 'openCard',
  });

  return (
    <dialog open={isOpen} className={className}>
      <div className="relative border  h-auto rounded">
        <header className="flex justify-between items-center border-b p-4">
          <span>{metadata?.title}</span>
          <button onClick={close} className="x-button" />
        </header>
        <div className="p-4">
          {renderDialogContent()}
        </div>
      </div>
    </dialog>
  );
}

export default Dialog;
