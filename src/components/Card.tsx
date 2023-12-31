import { DragEventHandler, FC, useContext } from "react";
import { Card, Status } from "../__generated__/graphql";
import { DialogContext } from "./DialogProvider";
import { getStatusLabel } from "../utils/render";

type Props = {
  card: Partial<Card>;
  isList?: boolean;
}

const listClassName = "w-full flex justify-between px-3 py-2 border border-gray-300 rounded shadow-md bg-white cursor-pointer";
const cardClassName = "card flex flex-col w-full block p-2 bg-white border-gray-300 rounded shadow-md bg-white border cursor-pointer hover:border-blue-700";

const CardComponent: FC<Props> = ({ card, isList }) => {
  const { open } = useContext(DialogContext);

  const isOverdue = (dueDatetime?: string) => {
    if (!dueDatetime) {
      return false;
    }

    const now = Date.now();

    if (Number(dueDatetime) > now) {
      return false;
    }

    const dueDate = new Date(Number(dueDatetime));
    const today = new Date();
    const cardDate = `${dueDate.getDate()}/${dueDate.getMonth()}/${dueDate.getFullYear()}`;
    const currentDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    return cardDate !== currentDate;
  }

  const handleClick = () => {
    open({ name: "openCard", title: "Card", id: card.id });
  }

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    const data = JSON.stringify({
      cardId: card.id,
      userId: card.assignee?.id,
    });
    e.dataTransfer.setData('text/plain', data);
    const allCards = document.querySelectorAll('.card');
    [...allCards].forEach((cardEl) => {
      if (cardEl.id !== card.id) {
        // @ts-ignore
        cardEl.style['pointer-events'] = 'none';
      }
    });
  }

  const handleDragEnd = () => {
    const allCards = document.querySelectorAll('.card');
    [...allCards].forEach((cardEl) => {
      // @ts-ignore
      cardEl.style['pointer-events'] = 'auto';
    });
  }

  if (isList) {
    return (
      <div style={{ userSelect: 'none' }} onClick={handleClick} className={listClassName} draggable onDragStart={handleDragStart}>
        <div className="flex flex-col">
          <h5 className="text-md font-medium tracking-tight text-gray-900">
            {card.title}
          </h5>
          <div className="flex gap-2">
            {card.team?.name && <span className="font-normal text-sm">{card.team.name}</span>}
            {isOverdue(card.dueDateTime) && card.status !== Status.Done && <span className="text-red-500 text-sm">Overdue</span>}
          </div>
        </div>
        <div>
          <span className="font-normal text-xs">{getStatusLabel(card.status as Status)}</span>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ userSelect: 'none' }}
      onClick={handleClick}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={(e) => e.stopPropagation()}
      onDragLeave={(e) => e.stopPropagation()}
      className={cardClassName}
      id={card.id}
    >
      <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900">
        {card.title}
      </h5>
      <div className="flex gap-2">
        {card.team?.name && <span className="font-normal text-sm">{card.team.name}</span>}
        {isOverdue(card.dueDateTime) && card.status !== Status.Done && <span className="text-red-500 text-sm">Overdue</span>}
        <span className="font-normal text-sm">{getStatusLabel(card.status as Status)}</span>
      </div>
    </div>
  );
}

export default CardComponent;
