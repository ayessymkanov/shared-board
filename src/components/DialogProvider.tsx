import { FC, ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
}

type DialogName = "addTeamCard" | "addPersonal" | "addBoard" | "invite" | "openCard";

type Metadata = Record<string, any> & {
  name?: DialogName;
  title?: string;
}

type DialogContextType = {
  isOpen: boolean;
  open: (metadata: Metadata) => void;
  close: () => void;
  metadata?: Metadata;
  setMetadata?: (meta: Metadata) => void;
}

export const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  open: () => { },
  close: () => { },
});

const DialogProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metadata, setMetadata] = useState({});

  const open = (metadata: Metadata) => {
    setMetadata(metadata);
    setIsOpen(true);
  }

  const close = () => {
    const dialog = document.querySelector('dialog');
    if (dialog) {
      dialog.addEventListener('webkitAnimationEnd', function handler() {
        dialog.classList.remove('hide');
        setIsOpen(false);
        setMetadata({});
        dialog.removeEventListener('webkitAnimationEnd', handler);
      });
      dialog.classList.add('hide');
    }
  }

  return (
    <DialogContext.Provider value={{ isOpen, open, close, metadata, setMetadata }}>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
