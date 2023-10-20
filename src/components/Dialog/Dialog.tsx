import { useContext } from "react";
import { DialogContext } from "../DialogProvider";
import "./styles.css";
import AddCardForm from "../AddCardForm";

const Dialog = () => {
  const { isOpen, close, metadata } = useContext(DialogContext);

  const renderDialogContent = () => {
    switch (metadata?.name) {
      case 'addCard': {
        return <AddCardForm close={close} />;
      }
    }
    return null;
  }

  return (
    <dialog open={isOpen} className="absolute top-1/2 shadow-backdrop -translate-y-1/2 rounded">
      <div className="relative border w-96 h-auto rounded">
        <header className="flex justify-between items-center border-b p-2">
          <span>Dialog title</span>
          <button onClick={close} className="x-button" />
        </header>
        <div className="p-2">
          {renderDialogContent()}
        </div>
      </div>
    </dialog>
  );
}

export default Dialog;
