import { FC } from "react";
import { Day as DayType } from "./useCalendar";
import Day from "./Day";

type Props = {
  week: Array<DayType>;
  onDayClick: (date: string) => void;
  activeDay: number;
}

const Week: FC<Props> = ({ week, onDayClick, activeDay }) => {
  return (
    <div className="flex gap-1">
      {week.map((day, index) => <Day key={index} day={day} isActive={day?.day === activeDay} onClick={onDayClick} />)}
    </div>
  );
}

export default Week;
