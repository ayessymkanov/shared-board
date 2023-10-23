import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const { setIsAuthenticated = () => { } } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const renderSignin = () => {
    if (isAuthenticated) {
      return (
        <>
          <span className="text-sm">Hello {user?.name}!</span>
          <a onClick={handleLogout} className="font-sm text-sm text-red-600 hover:cursor-pointer">Sign out</a>
        </>
      );
    }

    return (
      <>
        <Link to="/signin" className="text-sm">Sign in</Link>
        <Link to="/join" className="text-sm">Sign up</Link>
      </>
    );
  };
  return (
    <nav className="w-full h-12 border-b">
      <div className="flex justify-between items-center h-full px-2 mx-auto">
        <Link to="/">BOARD</Link>
        <div className="flex gap-x-3 items-center">
          {renderSignin()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
