import { FC } from "react";
import classNames from "classnames";
import { Day } from "./useCalendar";

type Props = {
  week: Array<Day>;
}

const Week: FC<Props> = ({ week }) => {
  return (
    <div className="flex gap-1">
      {week.map((day) => {
        const className = classNames("w-28 h-24 p-2", {
          "border rounded": Boolean(day),
          "bg-gray-100": day?.isWeekend,
        });
        const labelClassName = classNames("rounded-full p-2", {
          "bg-blue-700 text-white": day?.isToday,
        })
        return (
          <div className={className}>
            <span className={labelClassName}>
              {day?.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Week;
