import { FC, SyntheticEvent } from "react";

type Props = {
  onClick?: (e: SyntheticEvent) => void;
  children: string;
  isSubmit?: boolean;
};
const Button: FC<Props> = ({ onClick, children, isSubmit }) => {
  const className = `
    ext-white bg-blue-700 hover:bg-blue-800 
    focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
    focus:outline-none dark:focus:ring-blue-800 text-white`;
  if (isSubmit) {
    return <input type="submit" value={children} className={className} />;
  }
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
