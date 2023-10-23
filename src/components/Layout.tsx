import { FC } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dialog from "./Dialog";
import Subheader from "./Subheader";

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

  const contentClassName = classnames("w-full h-[calc(100vh_-_3rem)] overflow-y-auto pb-10");
  const childrenClassName = classnames("pt-4 px-4", {
    "pl-4": shouldRenderSidebar,
  });

  return (
    <main className="mx-auto relative">
      <Header />
      <section className="flex mx-auto">
        {renderSidebar()}
        <div className={contentClassName}>
          <Subheader />
          <div className={childrenClassName}>
            {children}
          </div>
        </div>
      </section>
      <Dialog />
    </main>
  );
};

export default Layout;
