import classNames from "classnames";
import useCalendar from "./useCalendar";
import Week from "./Week";

// const weekDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
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
    "w-20 text-xs text-center p-2 rounded mb-1",
    "sm:w-24 sm:text-sm",
    "md:w-28 md:text-base"
  );
  const days = weekDays.map((day) => (
    <div className={className}>{day}</div>
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
