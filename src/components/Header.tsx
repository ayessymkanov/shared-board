import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import HamburgerMenu from "./HamburgerMenu";
import { DialogContext } from "./DialogProvider";
import Link from "./Link";

type Props = {
  toggleSidebar: () => void;
}

const Header: FC<Props> = ({ toggleSidebar }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { open } = useContext(DialogContext);
  const { setIsAuthenticated = () => { } } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNewBoard = () => {
    open("addBoard", "Create a new Shared Board");
  }

  const handleLogout = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const renderActions = () => {
    if (isAuthenticated) {
      return (
        <div className="flex gap-1 sm:gap-4">
          <a onClick={handleNewBoard} className="font-sm text-sm text-blue-600 hover:cursor-pointer">+ New Board</a>
          <a onClick={handleLogout} className="font-sm text-sm text-red-600 hover:cursor-pointer">Sign out</a>
        </div>
      );
    }

    return (
      <>
        <Link to="/signin">Sign in</Link>
        <Link to="/join">Sign up</Link>
      </>
    );
  };

  return (
    <nav className="w-full h-12 border-b">
      <div className="flex justify-between items-center h-full px-4 mx-auto">
        <div className="flex items-center gap-2">
          {isAuthenticated && <HamburgerMenu onClick={toggleSidebar} />}
          <Link to="/">SharedBoard</Link>
        </div>
        <div className="flex gap-x-3 items-center">
          {renderActions()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
