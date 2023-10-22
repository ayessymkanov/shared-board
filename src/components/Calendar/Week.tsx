import { FC } from "react";
import { Day as DayType } from "./useCalendar";
import Day from "./Day";

type Props = {
  week: Array<DayType>;
}

const Week: FC<Props> = ({ week }) => {
  return (
    <div className="flex gap-1">
      {week.map((day) => <Day day={day} />)}
    </div>
  );
}

export default Week;
