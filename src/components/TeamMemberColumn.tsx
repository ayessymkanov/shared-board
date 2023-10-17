import { FC } from "react";

type Card = {
  title: string;
  id: string;
  assigneeId: number;
};
type Props = {
  cards?: Array<Card>;
  title: string;
};
const TeamMemberColumn: FC<Props> = ({ cards, title }) => {
  const renderCards = () => {
    if (!cards || cards.length === 0) {
      return <span className="text-xs">No cards</span>;
    }

    return cards.map((card) => (
      <div className="block max-w-sm p-2 bg-white border-gray-200 rounded">
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {card.title}
        </h5>
      </div>
    ));
  };
  return (
    <section className="flex flex-col gap-2 p-2 border rounded bg-gray-200">
      <h3 className="text-md">{title}</h3>
      {renderCards()}
    </section>
  );
};

export default TeamMemberColumn;
