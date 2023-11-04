import classNames from "classnames";
import useCalendar from "./useCalendar";
import Week from "./Week";
import { FC } from "react";

type CalendarProps = {
  onDayClick: (date: string) => void;
  activeDay: number;
}

const weekDays = [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
];

const WeekDays = () => {
  const className = classNames(
    "text-xs text-center p-2 rounded mb-1",
    "sm:text-sm",
    "md:text-base"
  );
  const days = weekDays.map((day) => (
    <div key={day} className={className}>{day}</div>
  ));

  return (
    <div className="grid grid-cols-7 gap-2">{days}</div>
  );
}

const Calendar: FC<CalendarProps> = ({ onDayClick, activeDay }) => {
  const { currentDate, month } = useCalendar(undefined, true);

  const renderMonth = () => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {month.map((week, index) => <Week key={index} week={week} activeDay={activeDay} onDayClick={onDayClick} />)}
      </div>
    );
  }

  return (
    <div className="bg-white rounded sm:p-4">
      <div className="mb-3 text-xl text-center">{currentDate}</div>
      <WeekDays />
      {renderMonth()}
    </div>
  );
}

export default Calendar;
