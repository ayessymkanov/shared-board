import { useQuery } from "@apollo/client";
import Calendar from "../components/Calendar";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";
import { gql } from "../__generated__";
import useCalendar from "../components/Calendar/useCalendar";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";
import { getDateObject } from "../utils/date";

const CARDS = gql(`
  query GetCards($input: CardsFilterInput) {
    cards(input: $input) {
      dueDateTime
      title
      status
      id
      teamId
      team {
        name 
      }
    }
  }
`);

const Home = () => {
  const { currentDay, currentMonth, currentYear } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date(`${currentMonth}/${currentDay}/${currentYear}`));
  const { data, loading } = useQuery(CARDS, {
    variables: {
      input: {
        timestamp: currentDate.getTime().toString(),
      }
    },
    fetchPolicy: 'no-cache'
  });

  const handleDayClick = (date: string) => {
    setCurrentDate(new Date(date));
  }

  const renderDayTasks = () => {
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }

    if (data?.cards.length === 0) {
      return <span className="text-white">No tasks for today!</span>;
    }

    return data?.cards.map((card) => <CardComponent key={card.id} isList card={card as Card} />);
  }

  const dateObject = getDateObject(currentDate);

  return (
    <PageWrapper>
      <div className="w-full flex border border-blue-800 rounded bg-blue-800">
        <div className="w-80 py-6 pt-20 flex flex-col gap-10 border-r border-blue-800 bg-blue-800">
          <div className="flex flex-col items-center text-white">
            <span className="text-6xl">{dateObject.day}</span>
            <span className="text-3xl">{dateObject.weekDay}</span>
          </div>
          <div className="flex flex-col gap-2 px-4 py-6">
            {renderDayTasks()}
          </div>
        </div>
        <div className="p-4 pl-0">
          <Calendar activeDay={currentDate.getDate()} onDayClick={handleDayClick} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
