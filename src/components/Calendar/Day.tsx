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
    "h-10 text-sm p-1 relative transition-colors duration-300",
    "sm:h-14 md:h-20 md:text-base", {
    "border border-blue-200 rounded hover:bg-gray-200 hover:cursor-pointer": Boolean(day),
    "bg-gray-100": day?.isWeekend,
    "bg-blue-300 hover:bg-blue-300": isActive,
  });
  const labelClassName = classNames(
    "rounded-full w-6 h-6 text-center flex items-center justify-center", {
    "bg-blue-700 text-white": day?.isToday,
  });

  return (
    <div className={className} onClick={() => day && onClick(day?.date)}>
      <div className={labelClassName}>
        {day?.day}
      </div>
    </div>
  );
}

export default Day;
