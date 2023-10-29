import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DialogContext } from "../DialogProvider";
import AddCardForm from "../AddCardForm";
import "./styles.css";
import AddPersonalCardForm from "../AddPersonalCardForm";
import AddBoardForm from "../AddBoardForm";
import AddTeamMemberForm from "../AddTeamMemberForm";

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
        return <AddBoardForm close={close} />
      }
      case 'invite': {
        return <AddTeamMemberForm close={close} />
      }
    }
  }

  return (
    <dialog open={isOpen} className="absolute top-20 shadow-backdrop rounded">
      <div className="relative border w-96 h-auto rounded">
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
