import { FC } from "react";
import classNames from "classnames";
import { useMediaQuery } from "usehooks-ts";
import { Day as DayType } from "./useCalendar";

type Props = {
  day: DayType;
  onClick: (date: string) => void;
  isActive?: boolean;
}
const Day: FC<Props> = ({ day, onClick, isActive }) => {
  const matchesMd = useMediaQuery('(min-width: 640px)');

  const className = classNames(
    "h-10 text-sm p-1 relative transition-colors duration-300",
    "sm:h-14 md:h-20 md:text-base", {
    "border border-blue-200 rounded hover:cursor-pointer": Boolean(day),
    "hover:bg-gray-200": Boolean(day) && !isActive,
    "bg-gray-100": !isActive && day?.isWeekend,
    "bg-blue-300 active:bg-blue-300 hover:bg-blue-300": isActive,
  });

  const labelClassName = classNames(
    "rounded-full absolute text-center flex items-center justify-center",
    {
      "w-4 h-4 text-xs top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2": !matchesMd,
      "w-6 h-6 text-sm top-1 left-1": matchesMd,
      "bg-blue-700 text-white": day?.isToday,
    }
  );

  const hasTasksClassName = classNames(
    "bg-blue-500 rounded-full absolute ", {
    "w-1 h-1 bottom-1 left-1/2 -translate-x-1/2": !matchesMd,
    "w-1.5 h-1.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2": matchesMd
  });

  return (
    <div className={className} onClick={() => day && onClick(day?.date)}>
      <div className={labelClassName}>
        {day?.day}
      </div>
      {day && day.hasTasks && <div className={hasTasksClassName} />}
    </div>
  );
}

export default Day;
