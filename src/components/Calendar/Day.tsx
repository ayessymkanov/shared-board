import { FC, useState } from "react";
import classNames from "classnames";
import { Day as DayType } from "./useCalendar";

type Props = {
  day: DayType;
}
const Day: FC<Props> = ({ day }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const className = classNames(
    "w-20 h-20 text-xs p-2 relative",
    "sm:w-20 sm:h-20 sm:text-sm",
    "md:w-28 md:h-24 md:text-base", {
    "border rounded": Boolean(day),
    "bg-gray-100": day?.isWeekend,
  });
  const labelClassName = classNames("rounded-full p-2", {
    "bg-blue-700 text-white": day?.isToday,
    "hidden": isHovered,
  });
  const addTaskClassName = classNames("absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border text-xs", {
    "hidden": !isHovered,
  });

  return (
    <div className={className} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <span className={labelClassName}>
        {day?.day}
      </span>
      {Boolean(day) && <button className={addTaskClassName}>Add Task</button>}
    </div>
  );
}

export default Day;
