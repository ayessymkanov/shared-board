const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DateObject = {
  day: number;
  weekDay: string;
}

export const getDateObject = (date: number | string | Date): DateObject => {
  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const weekDay = weekDays[currentDate.getDay()];

  return {
    day,
    weekDay,
  }
}
