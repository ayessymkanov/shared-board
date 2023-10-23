import classNames from "classnames";
import { FC } from "react";

type Props = {
  currentDate: string;
  onPrev: () => void;
  onNext: () => void;
}

const CalendarControls: FC<Props> = ({ currentDate, onPrev, onNext }) => {
  const buttonClassName = classNames("cursor-pointer");
  return (
    <div className="flex justify-between text-sm w-full mb-4">
      <div className={buttonClassName} onClick={onPrev}>{`<`}</div>
      <div>{currentDate}</div>
      <div className={buttonClassName} onClick={onNext}>{`>`}</div>
    </div>
  );
}

export default CalendarControls;
