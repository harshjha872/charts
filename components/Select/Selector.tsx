import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { memo, SetStateAction, Dispatch } from "react";

const Selector = ({
  onChangeFunc,
  filterParams,
  label,
}: {
  onChangeFunc: Dispatch<SetStateAction<string>>;
  filterParams: Array<{ displayValue: string; value: string }>;
  label: string;
}) => {
  return (
    <div className="flex items-center mx-4 my-2">
      <Label htmlFor="Age" className="mx-2">
        {label}
      </Label>
      <Select onValueChange={onChangeFunc}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {filterParams.map((item) => (
            <SelectItem value={item.value} key={Date.now() * Math.random()}>
              {item.displayValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default memo(Selector);
