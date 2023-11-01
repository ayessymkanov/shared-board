import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const numDays = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

export type Day = {
  day: number;
  date: string;
  isToday: boolean;
  isWeekend?: boolean;
  hasTasks?: boolean;
};

type Result = {
  month: Array<Array<Day>>;
  currentDate: string;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
}

const MONTH_CARDS = gql(`
  query Cards($input: CardsFilterInput) {
    cards(input: $input) {
      title
      dueDateTime
    }
  }
`);

const useCalendar = (now: Date = new Date(), fetchCards = false): Result => {
  const monthIndex = now.getMonth();
  const first = new Date(`${monthIndex + 1}/1/${now.getFullYear()}`);
  const firstDay = first.getDay();
  const numberOfDaysInMonth = numDays(now.getFullYear(), monthIndex);
  const month = [];
  const monthCards: Record<number, boolean> = {};
  const { data } = useQuery(MONTH_CARDS, {
    skip: !fetchCards,
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        startTimestamp: new Date(`${monthIndex + 1}/1/${now.getFullYear()}`).getTime().toString(),
        endTimestamp: new Date(`${monthIndex + 1}/${numberOfDaysInMonth}/${now.getFullYear()}`).getTime().toString(),
      }
    }
  });

  if (data) {
    data.cards.forEach((card) => {
      const date = new Date(Number(card.dueDateTime)).getDate();
      monthCards[date] = true;
    });
  }

  for (let i = 0; i < 6; i++) {
    month.push(new Array(7).fill(undefined));
  }

  let currentCol = (firstDay + 6) % 7;
  let currentRow = 0;

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    month[currentRow][currentCol] = {
      day: i,
      date: `${monthIndex + 1}/${i}/${now.getFullYear()}`,
      isToday: `${monthIndex}/${i}/${now.getFullYear()}` === `${monthIndex}/${now.getDate()}/${now.getFullYear()}`,
      isWeekend: currentCol === 5 || currentCol === 6,
      hasTasks: monthCards[i],
    };
    currentCol++;

    if (currentCol === 7) {
      currentRow++;
      currentCol = 0;
    }
  }

  return {
    currentDate: `${months[monthIndex]}, ${now.getFullYear()}`,
    currentMonth: monthIndex + 1,
    currentYear: now.getFullYear(),
    currentDay: now.getDate(),
    month,
  }
}

export default useCalendar;
