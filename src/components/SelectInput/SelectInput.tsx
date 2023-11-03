import { useRef, FC, useState } from "react";
import Input, { Props as InputProps } from "../Input";
import Popup from "../Popup";
import Options from "./Options";

export type Option = {
  value: string | number;
  label: string;
}
type Props = InputProps & {
  value: Option;
  options: Option[];
  loading?: boolean;
  onSetValue: (value: Option) => void;
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
  onSetValue,
  editingMode = true,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFocus = () => {
    if (editingMode) {
      setIsPopupOpen(true);
    }
  }

  const handleSelect = (option: Option) => {
    if (editingMode) {
      onSetValue(option);
      setIsPopupOpen(false);
    }
  }

  return (
    <div className="flex flex-col relative">
      <Input
        ref={ref}
        type="text"
        onChange={onChange}
        onFocus={handleFocus}
        name={name}
        label={label}
        value={value?.label}
        className={className}
        placeholder={placeholder}
        error={error}
        editingMode={editingMode}
      />
      <Popup parentRef={ref} isOpen={isPopupOpen} close={() => setIsPopupOpen(false)}>
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
