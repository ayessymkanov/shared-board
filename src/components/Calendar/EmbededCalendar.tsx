import classNames from "classnames";
import useCalendar, { Day } from "./useCalendar"
import { FC } from "react";

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "So"];

type Props = {
  onChange: (value: string) => void;
}

const EmbededCalendar: FC<Props> = ({ onChange }) => {
  const { month, currentMonth, currentYear } = useCalendar();

  const handleDayClick = (day: number) => {
    onChange(`${currentMonth}/${day}/${currentYear}`);
  }

  const renderDay = (day: Day, key: number) => {
    const className = classNames("basis-1 grow text-xs p-2 text-center rounded", {
      "hover:bg-blue-100": Boolean(day)
    });
    return <div key={key} className={className} onClick={() => handleDayClick(day?.day)}>{day?.day}</div>;
  }

  const renderWeek = (week: Array<Day>, key: number) => {
    return (
      <div className="flex" key={key}>
        {week.map((day, i) => renderDay(day, i))}
      </div>
    );
  }


  return (
    <div className="flex flex-col">
      <div className="flex">
        {weekDays.map((day) => <div key={day} className="basis-1 grow text-xs text-center">{day}</div>)}
      </div>
      {month.map((week, i) => renderWeek(week, i))}
    </div>
  );
}

export default EmbededCalendar;
