import { FC, ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
}

type Metadata = {
  name?: string;
}

type DialogContextType = {
  isOpen: boolean;
  open: (name: string) => void;
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

  const open = (name: string) => {
    setMetadata({ name });
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
    setMetadata({});
  }

  return (
    <DialogContext.Provider value={{ isOpen, open, close, metadata, setMetadata }}>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
