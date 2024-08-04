import { DatePicker, Space } from "antd";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
const { RangePicker } = DatePicker;
import { memo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import dayjs from "dayjs";
import { setCookie } from "cookies-next";

const Datepicker = ({
  setStartandEndDate,
  defaultValue,
}: {
  setStartandEndDate: Dispatch<SetStateAction<Array<string>>>;
  defaultValue: Array<string>;
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
      <Label htmlFor="Date" className="mx-2">
        Date Range
      </Label>
      <Space direction="vertical" size={12}>
        <RangePicker
          defaultValue={
            defaultValue[0] !== ""
              ? [
                  dayjs(defaultValue[0], "YYYY-MM-DD"),
                  dayjs(defaultValue[1], "YYYY-MM-DD"),
                ]
              : undefined
          }
          className="rangepicker_custom"
          format="YYYY-MM-DD"
          onChange={(value, dateString) => {
            router.push(
              pathname +
                "?" +
                createQueryString("daterange", dateString.toString())
            );
            setCookie("daterange", dateString.toString());
            setStartandEndDate(dateString);
          }}
        />
      </Space>
    </div>
  );
};

export default memo(Datepicker);
