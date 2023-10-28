import { useRef, FC, useState } from "react";
import Input, { Props as InputProps } from "../Input";
import Popup from "../Popup";
import Options from "./Options";

export type Option = {
  value: string | number;
  label: string;
}
type Props = InputProps & {
  options: Option[];
  loading?: boolean;
}

const SelectInput: FC<Props> = ({
  onChange,
  name,
  error,
  className,
  label,
  placeholder,
  value,
  options,
  loading,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBlur = () => {
    setIsPopupOpen(false);
  }
  const handleFocus = () => {
    setIsPopupOpen(true);
  }

  // const handleOnChange = (value: string) => {
  //   // setValue(value);
  //   console.log(value);
  //   setIsPopupOpen(false);
  // }

  const handleSelect = (option: Option) => {
    console.log(option);
  }

  return (
    <div className="flex flex-col relative">
      <Input
        ref={ref}
        type="text"
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name={name}
        label={label}
        value={value}
        className={className}
        placeholder={placeholder}
        error={error}
      />
      <Popup parentRef={ref} isOpen={isPopupOpen}>
        <Options
          options={options}
          loading={loading}
          onSelect={handleSelect}
        />
      </Popup>
    </div>
  );
}

export default SelectInput;
