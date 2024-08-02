import { DatePicker, Space } from "antd";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
const { RangePicker } = DatePicker;
import { memo } from "react";

const Datepicker = ({
  setStartandEndDate,
}: {
  setStartandEndDate: Dispatch<SetStateAction<[string, string]>>;
}) => {
  console.log("date picker called");
  return (
    <div className="flex items-center mx-4 my-2">
      <Label htmlFor="Date" className="mx-2">
        Date Range
      </Label>
      <Space direction="vertical" size={12}>
        <RangePicker
          className="rangepicker_custom"
          format="YYYY-MM-DD"
          onChange={(value, dateString) => {
            setStartandEndDate(dateString);
          }}
        />
      </Space>
    </div>
  );
};

export default memo(Datepicker);
