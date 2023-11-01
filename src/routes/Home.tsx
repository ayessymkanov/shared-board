import { useQuery } from "@apollo/client";
import Calendar from "../components/Calendar";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";
import { gql } from "../__generated__";
import useCalendar from "../components/Calendar/useCalendar";
import CardComponent from "../components/Card";
import { Card } from "../__generated__/graphql";
import { getDateObject } from "../utils/date";
import classNames from "classnames";

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
      return <div>Loading...</div>;
    }

    if (data?.cards.length === 0) {
      return <span>No tasks for today!</span>;
    }

    return data?.cards.map((card) => <CardComponent key={card.id} isList card={card as Card} />);
  }

  const dateObject = getDateObject(currentDate);

  const renderToday = () => {
    const wrapperClassName = classNames(
      "py-1 md:py-6 flex grow flex-col gap-10 md:w-80"
    );

    return (
      <div className={wrapperClassName}>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl">{dateObject.day}</span>
          <span className="text-2xl md:text-3xl">{dateObject.weekDay}</span>
        </div>
        <div className="flex flex-col gap-2 sm:px-4 sm:py-6">
          {renderDayTasks()}
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="w-full flex flex-col-reverse md:flex-row">
        {renderToday()}
        <div className="pb-10 md:pb-0 sm:p-4 sm:pl-0 min-w-0 grow md:grow-[2]">
          <Calendar activeDay={currentDate.getDate()} onDayClick={handleDayClick} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
