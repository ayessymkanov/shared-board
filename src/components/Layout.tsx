import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dialog from "./Dialog";
import Subheader from "./Subheader";

type Props = {
  children: React.ReactNode;
};

const NO_SIDEBAR_ROUTES = ["signin", "join", "verify"];

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }

  const hideSidebar = () => {
    setIsSidebarOpen(false);
  }

  const shouldRenderSidebar = !NO_SIDEBAR_ROUTES.includes(location.pathname.split('/')[0]);
  const renderSidebar = () => {
    if (shouldRenderSidebar) {
      return <Sidebar isOpen={isSidebarOpen} hideSidebar={hideSidebar} />;
    }

    return null;
  };

  const contentClassName = classnames("w-full h-[calc(100vh_-_3rem)] overflow-y-auto pb-10 absolute z-0 left-1/2 -translate-x-1/2 border");
  const childrenClassName = classnames("pt-4 px-4");

  return (
    <main className="mx-auto relative">
      <Header toggleSidebar={toggleSidebar} />
      <section className="bg-green-200 relative">
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
