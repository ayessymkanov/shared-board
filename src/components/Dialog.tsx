import { useContext } from "react";
import { DialogContext } from "./DialogProvider";

const Dialog = () => {
  const { isOpen, close } = useContext(DialogContext);

  return (
    <dialog open={isOpen} className="absolute top-1/2 left-1/2 shadow-backdrop -translate-x-1/2 -translate-y-1/2">
      <div className="relative border w-96 h-auto">
        <div>dialog title</div>
        <button onClick={close}>close</button>
        <div>dialog</div>
      </div>
    </dialog>
  );
}

export default Dialog;
