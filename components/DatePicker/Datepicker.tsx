import { DatePicker, Space } from "antd";
import type { DatePickerProps, GetProps } from "antd";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};

const Datepicker = ({
  setStartandEndDate,
}: {
  setStartandEndDate: Dispatch<SetStateAction<Array<string>>>;
}) => (
  <div className="flex items-center mx-4 my-2">
    <Label htmlFor="Date" className="mx-2">
      Date
    </Label>
    <Space direction="vertical" size={12}>
      <RangePicker
        className="rangepicker_custom"
        format="YYYY-MM-DD"
        onChange={(value, dateString) => {
          setStartandEndDate(dateString);
        }}
        onOk={onOk}
      />
    </Space>
  </div>
);

export default Datepicker;
