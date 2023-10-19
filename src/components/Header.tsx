import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Button from "./Button";
import { DialogContext } from "./DialogProvider";

const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { open } = useContext(DialogContext);

  const renderSignin = () => {
    if (isAuthenticated) {
      return (
        <>
          <Button onClick={open} type="outlined" size="xs">+ Add Card</Button>
          <span>Hello {user?.name}!</span>
        </>
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
      <div className="flex justify-between items-center h-full container mx-auto">
        <Link to="/">BOARD</Link>
        <div className="flex gap-x-3 items-center">
          {renderSignin()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
