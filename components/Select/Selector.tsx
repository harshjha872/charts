import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { memo, SetStateAction, Dispatch, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { setCookie } from "cookies-next";

const Selector = ({
  onChangeFunc,
  filterParams,
  label,
  defaultValue,
}: {
  onChangeFunc: Dispatch<SetStateAction<string>>;
  filterParams: Array<{ displayValue: string; value: string }>;
  label: string;
  defaultValue: string | null;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center mx-4 my-2">
      <Label htmlFor={label.toLowerCase()} className="mx-2">
        {label}
      </Label>
      <Select
        defaultValue={defaultValue ? defaultValue : undefined}
        onValueChange={(e) => {
          router.push(
            pathname +
              "?" +
              createQueryString(label.toLowerCase(), e.toString())
          );
          setCookie(label.toLowerCase(), e.toString());
          onChangeFunc(e);
        }}
      >
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
