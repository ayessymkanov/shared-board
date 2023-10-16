import { ChangeEvent, FC } from "react";
import classnames from "classnames";

type Props = {
  type: "email" | "text" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  name: string;
  error?: string;
};

const Input: FC<Props> = ({
  type,
  value,
  onChange,
  label,
  className,
  name,
  error,
}) => {
  const defaultClassName = "flex flex-col";
  const inputClassName = `
    bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
    dark:focus:border-blue-500`;
  return (
    <div className={classnames(defaultClassName, className)}>
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        className={inputClassName}
        onChange={onChange}
      />
      <span className="text-red-400 text-xs">{error}</span>
    </div>
  );
};

export default Input;
