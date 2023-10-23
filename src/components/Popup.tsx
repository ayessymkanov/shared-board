import classNames from "classnames";
import { FC, ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  parentRef: RefObject<HTMLElement | HTMLInputElement>;
  isOpen: boolean;
}

const Popup: FC<Props> = ({ children, parentRef, isOpen }) => {
  const className = classNames("absolute bg-white p-2 rounded shadow-md border", {
    "hidden": !isOpen,
  });

  const getTop = () => {
    const dimensions = parentRef?.current?.getBoundingClientRect();
    if (dimensions?.height) {
      return dimensions.height + 30;
    }

    return -1000;
  }

  const getWidth = () => {
    const dimensions = parentRef?.current?.getBoundingClientRect();
    if (dimensions?.width) {
      return dimensions.width;
    }

    return 0;
  }

  return (
    <div className={className} style={{ top: getTop(), width: getWidth() }}>{children}</div>
  );
}

export default Popup;
