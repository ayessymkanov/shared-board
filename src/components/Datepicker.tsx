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
  const handleFocus = () => {
    setIsPopupOpen(true);
  }

  const handleOnChange = (value: string) => {
    setValue(value);
    setIsPopupOpen(false);
  }
  return (
    <div className="flex flex-col relative z-1">
      <Input
        ref={ref}
        type={type}
        onChange={onChange}
        onFocus={handleFocus}
        name={name}
        label={label}
        value={value}
        className={className}
        placeholder={placeholder}
        error={error}
      />
      <Popup parentRef={ref} isOpen={isPopupOpen} close={() => setIsPopupOpen(false)}><EmbededCalendar onChange={handleOnChange} /></Popup>
    </div>
  );
}

export default Datepicker;
