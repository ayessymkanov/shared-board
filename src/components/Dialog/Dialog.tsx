import { useContext } from "react";
import { DialogContext } from "../DialogProvider";
import Button from "../Button";
import "./styles.css";

const Dialog = () => {
  const { isOpen, close } = useContext(DialogContext);

  return (
    <dialog open={isOpen} className="absolute top-1/2 shadow-backdrop -translate-y-1/2 rounded">
      <div className="relative border w-96 h-auto rounded">
        <header className="flex justify-between items-center border-b p-2">
          <span>Dialog title</span>
          <button onClick={close} className="x-button" />
        </header>
        <div className="p-2">
          dialog
        </div>
        <footer className="flex justify-end border-t p-2">
          <div className="flex gap-2">
            <Button size="xs" type="outlined" onClick={close}>Cancel</Button>
            <Button size="xs">Submit</Button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}

export default Dialog;
