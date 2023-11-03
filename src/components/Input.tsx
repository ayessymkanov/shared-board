import { RefObject, forwardRef } from "react";
import classnames from "classnames";

export type Props = {
  type: "email" | "text" | "password" | "textarea";
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
  autoComplete?: "off" | "on";
  disabled?: boolean;
  editingMode?: boolean;
  maxLength?: number;
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
  disabled,
  editingMode = true,
  maxLength = 200,
}, ref) => {
  const defaultClassName = "flex flex-col";
  const inputClassName = classnames("border border-gray-100 rounded-lg bg-gray-50 text-sm text-gray-900 block w-full p-2.5", {
    "text-gray-300": disabled || !editingMode,
    "border border-gray-300 focus:ring-blue-500 focus:border-blue-500": editingMode,
  });

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          value={value}
          name={name}
          className={inputClassName}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
          disabled={disabled || !editingMode}
          maxLength={maxLength}
          rows={6}
          style={{ resize: 'none' }}
        />
      );
    }

    return (
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
        autoComplete="off"
        disabled={disabled}
        readOnly={!editingMode}
      />
    );
  }
  return (
    <div className={classnames(defaultClassName, className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={name} className="mb-1 text-xs text-gray-700">
          {label}
        </label>
        {error && <span className="text-red-400 text-xs">{error}</span>}
        {type === "textarea" && !error && editingMode && <span className="text-xs">{value?.length ?? 0} / 200</span>}
      </div>
      {renderInput()}
    </div>
  );
});

export default Input;
