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
      return <span>Hello {user?.name}!</span>;
    }

    return (
      <>
        <Link to="/signin">Sign in</Link>
        <Link to="/join">Sign up</Link>
      </>
    );
  };
  return (
    <header className="flex justify-between items-center w-full h-12 border-b">
      <Link to="/">BOARD</Link>
      <div className="flex gap-x-3 items-center">
        <Button onClick={open}>Add Card</Button>
        {renderSignin()}
      </div>
    </header>
  );
};

export default Header;
