const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
