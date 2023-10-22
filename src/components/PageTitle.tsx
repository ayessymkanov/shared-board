import { FC } from "react";

type Props = {
  children: string;
}
const PageTitle: FC<Props> = ({ children }) => {
  return <h2 className="text-xl font-medium mb-4">{children}</h2>;
}

export default PageTitle;
