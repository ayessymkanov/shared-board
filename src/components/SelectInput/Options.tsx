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

  const renderOption = (option: Option) => {
    const handleClick = () => {
      onSelect(option);
    }
    const className = "flex items-center px-2 py-1 text-sm text-gray-800 rounded hover:bg-gray-100 hover:cursor-pointer group truncate overflow-hidden"
    return <div key={option.value} className={className} onClick={handleClick}>{option.label}</div>;
  }

  return (
    <div className="flex flex-col py-2 max-h-20 overflow-scroll">
      {options.map((option) => renderOption(option))}
    </div>
  );
}

export default Options;
