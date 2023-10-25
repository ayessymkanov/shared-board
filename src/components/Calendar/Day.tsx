import { FC } from "react";
import classNames from "classnames";
import { Day as DayType } from "./useCalendar";

type Props = {
  day: DayType;
  onClick: (date: string) => void;
  isActive?: boolean;
}
const Day: FC<Props> = ({ day, onClick, isActive }) => {
  const className = classNames(
    "w-20 h-20 text-xs p-2 relative transition-colors duration-300",
    "sm:w-20 sm:h-20 sm:text-sm",
    "md:w-28 md:h-24 md:text-base", {
    "border border-blue-200 rounded hover:bg-gray-200 hover:cursor-pointer": Boolean(day),
    "bg-gray-100": day?.isWeekend,
    "bg-blue-300 hover:bg-blue-300": isActive,
  });
  const labelClassName = classNames("rounded-full p-2", {
    "bg-blue-700 text-white": day?.isToday,
  });

  return (
    <div className={className} onClick={() => onClick(day?.date)}>
      <span className={labelClassName}>
        {day?.day}
      </span>
    </div>
  );
}

export default Day;
