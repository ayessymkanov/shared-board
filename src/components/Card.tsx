import { FC } from "react";
import { Card } from "../__generated__/graphql";

type Props = {
  card: Partial<Card>;
  isList?: boolean;
}

const CardComponent: FC<Props> = ({ card, isList }) => {
  if (isList) {
    return (
      <div className="w-full flex justify-between items-center px-3 py-2 border rounded">
        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {card.title}
        </h5>
        <div>{card.status}</div>
      </div>
    );
  }
  return (
    <div className="w-full block p-2 bg-white border-gray-200 rounded">
      <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
        {card.title}
      </h5>
    </div>
  );
}

export default CardComponent;
