import { useContext } from "react";
import { DialogContext } from "../DialogProvider";
import AddCardForm from "../AddCardForm";
import "./styles.css";

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
