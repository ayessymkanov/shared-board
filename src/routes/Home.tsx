import { useQuery } from "@apollo/client";
import Calendar from "../components/Calendar";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";
import { gql } from "../__generated__";
import useCalendar from "../components/Calendar/useCalendar";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";

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
  const { data } = useQuery(CARDS, {
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
    return (
      <div className="w-80 px-4 py-6 flex flex-col gap-10 border-r">
        <span className="text-3xl">{currentDate.toDateString()}</span>
        <div className="flex flex-col gap-2">
          {data?.cards.map((card) => <CardComponent key={card.id} isList card={card as Card} />)}
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="w-full flex border rounded">
        {renderDayTasks()}
        <div className="px-4 py-6">
          <Calendar activeDay={currentDate.getDate()} onDayClick={handleDayClick} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
