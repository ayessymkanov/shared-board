import { FC } from "react";
import { Day as DayType } from "./useCalendar";
import Day from "./Day";

type Props = {
  week: Array<DayType>;
  onDayClick: (date: string) => void;
  activeDay: number;
}

const Week: FC<Props> = ({ week, onDayClick, activeDay }) => {
  const hasDay = week.some((day) => day);
  return (
    <div className="grid grid-cols-7 gap-2">
      {hasDay && week.map((day, index) => <Day key={index} day={day} isActive={day?.day === activeDay} onClick={onDayClick} />)}
    </div>
  );
}

export default Week;
