import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  to: string;
  replace?: boolean;
  children: string;
};
const Link: FC<Props> = ({ to, replace, children }) => {
  return (
    <RouterLink
      to={to}
      replace={replace}
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      {children}
    </RouterLink>
  );
};

export default Link;
