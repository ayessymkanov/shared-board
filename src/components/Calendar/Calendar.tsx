import useCalendar from "./useCalendar";
import Week from "./Week";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeekDays = () => {
  const days = weekDays.map((day) => (
    <div className="w-28 text-center p-2 rounded mb-1">{day}</div>
  ));

  return (
    <div className="flex gap-1">{days}</div>
  );
}

const Calendar = () => {
  const { currentDate, month } = useCalendar();

  const renderMonth = () => {
    return (
      <div className="flex flex-col gap-1">
        {month.map((week, index) => <Week key={index} week={week} />)}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 text-lg">{currentDate}</div>
      <WeekDays />
      {renderMonth()}
    </div>
  );
}

export default Calendar;
