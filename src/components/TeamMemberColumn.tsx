import { DragEventHandler, FC } from "react";
import Card from "./Card";
import { Card as CardType } from "../__generated__/graphql";
import { UPDATE_CARD } from "../gql/mutations";
import { useMutation } from "@apollo/client";

type Props = {
  cards?: Array<Partial<CardType>>;
  title: string;
  userId: string | number;
};

const TeamMemberColumn: FC<Props> = ({ cards, title, userId }) => {
  const [updateCard, { client }] = useMutation(UPDATE_CARD);

  const renderCards = () => {
    if (!cards || cards.length === 0) {
      return <span className="text-xs">No cards</span>;
    }

    return cards.map((card) => <Card key={card.id} card={card} />);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.cardId) {
        await updateCard({
          variables: {
            updateCardId: data.cardId,
            input: {
              assigneeId: Number(userId),
            }
          }
        });
        client.refetchQueries({
          include: ["Team", "GetCards"]
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const dragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  }


  return (
    <section
      className="relative flex min-h-0 flex-col gap-2 p-2 border rounded bg-gray-200"
      onDragOver={dragOver}
      onDrop={handleDrop}
    >
      <h3 className="text-md">{title}</h3>
      {renderCards()}
    </section>
  );
};

export default TeamMemberColumn;
