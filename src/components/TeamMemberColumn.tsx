import { FC } from "react";
import Card from "./Card";
import { Card as CardType } from "../__generated__/graphql";

type Props = {
  cards?: Array<Partial<CardType>>;
  title: string;
};

const TeamMemberColumn: FC<Props> = ({ cards, title }) => {
  const renderCards = () => {
    if (!cards || cards.length === 0) {
      return <span className="text-xs">No cards</span>;
    }

    return cards.map((card) => <Card key={card.id} card={card} />);
  };
  return (
    <section className="flex flex-col gap-2 p-2 border rounded bg-gray-200">
      <h3 className="text-md">{title}</h3>
      {renderCards()}
    </section>
  );
};

export default TeamMemberColumn;
