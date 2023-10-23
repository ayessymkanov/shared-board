import { useLocation } from "react-router-dom";

const routes = [
  "/team",
  "/personal",
]

const Subheader = () => {
  const { pathname } = useLocation();

  const getTitle = () => {
    switch (pathname) {
      case "/team": {
        return "Team";
      }
      case "/personal": {
        return "Personal";
      }
      default: {
        return "";
      }
    }
  }

  if (routes.includes(pathname)) {
    return (
      <div className="border-b py-3 px-2">{getTitle()}</div>
    );
  }

  return null;
}

export default Subheader;
