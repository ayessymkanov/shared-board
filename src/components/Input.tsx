import { RefObject, forwardRef } from "react";
import classnames from "classnames";

export type Props = {
  type: "email" | "text" | "password";
  value: string;
  onChange: (e: any) => void;
  label: string;
  className?: string;
  name: string;
  error?: string;
  placeholder?: string;
  ref?: RefObject<HTMLElement>;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(({
  type,
  value,
  onChange,
  label,
  className,
  name,
  error,
  placeholder,
  onBlur,
  onFocus,
}, ref) => {
  const defaultClassName = "flex flex-col";
  const inputClassName = `
    bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
    dark:focus:border-blue-500`;
  return (
    <div className={classnames(defaultClassName, className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={name} className="mb-1 text-sm">
          {label}
        </label>
        <span className="text-red-400 text-xs">{error}</span>
      </div>
      <input
        type={type}
        value={value}
        name={name}
        className={inputClassName}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
});

export default Input;
