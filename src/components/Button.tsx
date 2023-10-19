import { FC, SyntheticEvent } from "react";
import classNames from "classnames";

type Props = {
  onClick?: (e: SyntheticEvent) => void;
  children: string;
  isSubmit?: boolean;
  size?: "xs" | "sm" | "md";
  type?: "outlined" | "primary";
  color?: "blue" | "red";
};
const Button: FC<Props> = ({
  onClick,
  children,
  isSubmit,
  size = "md",
  type = "primary",
  color = "blue",
}) => {
  const defaultClassName = `
    ext-white bg-blue-700 hover:bg-blue-800 
    focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
    focus:outline-none dark:focus:ring-blue-800 text-white`;
  const className = classNames(defaultClassName, {
    "px-3 text-xs": size === "xs",
    "px-3 text-sm": size === "sm",
    "px-5 py-2.5": size === "md",
    "border border-blue-700 hover:bg-blue-800 bg-white hover:text-white text-blue-700": type === "outlined" && color === "blue",
    "border border-red-700 hover:bg-red-800 bg-white hover:text-white text-red-700": type === "outlined" && color === "red",
    "bg-red-700 hover:bg-red-800": type === "primary" && color === "red",
  });
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
