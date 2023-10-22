import { FC } from "react";
import { Card } from "../__generated__/graphql";

type Props = {
  card: Partial<Card>;
  isList?: boolean;
}

const CardComponent: FC<Props> = ({ card, isList }) => {
  if (isList) {
    return (
      <div className="w-full flex justify-between items-center px-3 py-2 border rounded shadow-md">
        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white">
          {card.title}
        </h5>
        <span className="font-normal text-sm">{card.status}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full block p-2 bg-white border-gray-200 rounded shadow-md">
      <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
        {card.title}
      </h5>
      <span className="font-normal text-sm">{card.status}</span>
    </div>
  );
}

export default CardComponent;
