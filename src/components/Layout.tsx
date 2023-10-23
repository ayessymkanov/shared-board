import { FC } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dialog from "./Dialog";

type Props = {
  children: React.ReactNode;
};

const NO_SIDEBAR_ROUTES = ["/signin", "/join"];

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();

  const shouldRenderSidebar = !NO_SIDEBAR_ROUTES.includes(location.pathname);
  const renderSidebar = () => {
    if (shouldRenderSidebar) {
      return <Sidebar />;
    }

    return null;
  };
  const childrenClassName = classnames("w-full transition-transform max-sm:-translate-x-32", {
    "pl-4": shouldRenderSidebar,
  });
  return (
    <main className="mx-auto relative pb-10">
      <Header />
      <section className="flex items-baseline mx-auto">
        {renderSidebar()}
        <div className={childrenClassName}>{children}</div>
      </section>
      <Dialog />
    </main>
  );
};

export default Layout;
