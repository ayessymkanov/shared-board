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
      className="font-sm text-sm text-blue-600 hover:cursor-pointer hover:underline"
    >
      {children}
    </RouterLink>
  );
};

export default Link;
