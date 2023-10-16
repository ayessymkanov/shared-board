import { FC } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <main className="container mx-auto">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
