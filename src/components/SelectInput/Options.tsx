import { FC } from "react";
import type { Option } from "./SelectInput";
type Props = {
  options: Option[];
  loading?: boolean;
  onSelect: (option: Option) => void;
}
const Options: FC<Props> = ({ options, loading, onSelect }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!options || options.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col">
      {options.map((option) => <div onClick={() => onSelect(option)}>{option.label}</div>)}
    </div>
  );
}

export default Options;
