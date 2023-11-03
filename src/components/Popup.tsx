import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { FC, ReactNode, RefObject, useRef } from "react";

type Props = {
  children: ReactNode;
  parentRef: RefObject<HTMLElement | HTMLInputElement>;
  isOpen: boolean;
  close: () => void;
}

const Popup: FC<Props> = ({ children, parentRef, isOpen, close }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, close);

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

  const className = classNames("absolute z-10 bg-white rounded shadow-md border", {
    "hidden": !isOpen,
  });

  return (
    <div ref={ref} className={className} style={{ top: getTop(), width: getWidth() }}>{children}</div>
  );
}

export default Popup;
