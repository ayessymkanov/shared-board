import { FC, useContext } from "react";
import { Card } from "../__generated__/graphql";
import { DialogContext } from "./DialogProvider";

type Props = {
  card: Partial<Card>;
  isList?: boolean;
}

const listClassName = "w-full flex justify-between px-3 py-2 border border-gray-300 rounded shadow-md bg-white cursor-pointer";
const cardClassName = "flex flex-col w-full block p-2 bg-white border-gray-300 rounded shadow-md bg-white border cursor-pointer";

const CardComponent: FC<Props> = ({ card, isList }) => {
  const { open } = useContext(DialogContext);

  const handleClick = () => {
    open({ name: "openCard", title: "Card", id: card.id });
  }

  if (isList) {
    return (
      <div onClick={handleClick} className={listClassName}>
        <div>
          <h5 className="text-md font-medium tracking-tight text-gray-900">
            {card.title}
          </h5>
          <span className="font-normal text-sm">{card.team?.name}</span>
        </div>
        <div>
          <span className="font-normal text-sm">{card.status}</span>
        </div>
      </div>
    );
  }
  return (
    <div onClick={handleClick} className={cardClassName}>
      <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900">
        {card.title}
      </h5>
      <span className="font-normal text-sm">{card.status}</span>
    </div>
  );
}

export default CardComponent;
