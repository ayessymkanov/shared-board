import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated = () => {} } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const renderSignin = () => {
    if (isAuthenticated) {
      return <button onClick={handleLogout}>logout</button>;
    }

    return <Link to="/signin">Sign in</Link>;
  };
  return (
    <header className="flex justify-between w-full py-4 border-b">
      <div>board</div>
      <div className="flex">{renderSignin()}</div>
    </header>
  );
};

export default Header;
