import { FC, useRef, useState } from "react";
import Input from "./Input"
import Popup from "./Popup";
import EmbededCalendar from "./Calendar/EmbededCalendar";
import { Props as InputProps } from "./Input";

type Props = InputProps & {
  setValue: (value: string) => void;
}

const Datepicker: FC<Props> = ({
  type,
  value,
  onChange,
  label,
  className,
  name,
  error,
  placeholder,
  setValue,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleBlur = () => {
    // setIsPopupOpen(false);
  }
  const handleFocus = () => {
    setIsPopupOpen(true);
  }

  const handleOnChange = (value: string) => {
    setValue(value);
    setIsPopupOpen(false);
  }
  return (
    <div className="flex flex-col relative">
      <Input
        ref={ref}
        type={type}
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
      <Popup parentRef={ref} isOpen={isPopupOpen}><EmbededCalendar onChange={handleOnChange} /></Popup>
    </div>
  );
}

export default Datepicker;
