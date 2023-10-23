import classNames from "classnames";
import useCalendar, { Day } from "./useCalendar"
import { FC, useMemo, useState } from "react";
import CalendarControls from "./CalendarControls";

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "So"];

type Props = {
  onChange: (value: string) => void;
}

const EmbededCalendar: FC<Props> = ({ onChange }) => {
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth() + 1);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const calendarDate = useMemo(() => {
    const dateString = `${calendarMonth}/1/${calendarYear}`;
    return new Date(dateString);
  }, [calendarMonth, calendarYear]);
  const { month, currentMonth, currentYear, currentDate } = useCalendar(calendarDate);

  const handleNext = () => {
    if (calendarMonth === 12) {
      setCalendarMonth(1);
      setCalendarYear((current) => current + 1);
      return;
    }

    setCalendarMonth((current) => current + 1);
  }

  const handlePrev = () => {
    if (calendarMonth === 1) {
      setCalendarMonth(12);
      setCalendarYear((current) => current - 1);
      return;
    }

    setCalendarMonth((current) => current - 1);
  }

  const handleDayClick = (day: number) => {
    onChange(`${currentMonth}-${day}-${currentYear}`);
  }

  const renderDay = (day: Day, key: number) => {
    const className = classNames("basis-1 grow text-xs p-2 text-center rounded", {
      "hover:bg-blue-100 cursor-pointer": Boolean(day),
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
      <CalendarControls currentDate={currentDate} onNext={handleNext} onPrev={handlePrev} />
      <div className="flex">
        {weekDays.map((day) => <div key={day} className="basis-1 grow text-xs text-center">{day}</div>)}
      </div>
      {month.map((week, i) => renderWeek(week, i))}
    </div>
  );
}

export default EmbededCalendar;
