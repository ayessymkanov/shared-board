import { FC, ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
}

type DialogContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  open: () => { },
  close: () => { },
});

const DialogProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
