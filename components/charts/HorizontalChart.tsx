import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import SimplifyChartData from "@/Helpers/SimplifyChartData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import * as interfaces from "@/Helpers/interfaces/interface";
import { useCallback, memo, Dispatch, SetStateAction, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { setCookie } from "cookies-next";

const chartConfig = {
  value: {
    label: "Value",
    color: "#0ea5e9",
  },
  label: {
    color: "#fff",
  },
} satisfies ChartConfig;

const getTotalSumOfAllData = (
  filteredData: Array<interfaces.inputData>,
  arrayOfDates: Array<string>
): interfaces.featureData => {
  if (filteredData.length === 0)
    return { Age: "", Gender: "", Day: "", chartData: [] };

  let totalData: interfaces.inputData = {
    Age: filteredData[0].Age,
    Day: JSON.stringify(arrayOfDates),
    Gender: filteredData[0].Gender,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  filteredData.forEach((item) => {
    totalData.A = +totalData.A + +item.A;
    totalData.B = +totalData.B + +item.B;
    totalData.C = +totalData.C + +item.C;
    totalData.D = +totalData.D + +item.D;
    totalData.E = +totalData.E + +item.E;
    totalData.F = +totalData.F + +item.F;
  });

  return SimplifyChartData(totalData);
};

const HorizontalChart = ({
  chartData,
  yAxisKeyName,
  xAxisKeyName,
  arrayOfDates,
  setFeatureName,
}: {
  chartData: Array<interfaces.inputData>;
  yAxisKeyName: string;
  xAxisKeyName: string;
  arrayOfDates: Array<string>;
  setFeatureName: Dispatch<SetStateAction<string>>;
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

  let updatedChartData = useMemo(
    () => getTotalSumOfAllData(chartData, arrayOfDates),
    [chartData, arrayOfDates]
  );

  // const calcLineData = useCallback(
  //   (featureName: string, data: Array<interfaces.inputData>) => {
  //     let obj = {} as any;

  //     data.forEach((item) => {
  //       if (item.Day in obj) {
  //         obj[item.Day].A += +item.A;
  //         obj[item.Day].B += +item.B;
  //         obj[item.Day].C += +item.C;
  //         obj[item.Day].D += +item.D;
  //         obj[item.Day].E += +item.E;
  //         obj[item.Day].F += +item.F;
  //       } else {
  //         obj[item.Day] = {
  //           ...item,
  //           A: +item.A,
  //           B: +item.B,
  //           C: +item.C,
  //           D: +item.D,
  //           E: +item.E,
  //           F: +item.F,
  //         };
  //       }
  //     });

  //     let dates = Object.keys(obj);

  //     getDataForLineChart(
  //       dates.map((date) => obj[date]),
  //       featureName
  //     );
  //   },
  //   [getDataForLineChart]
  // );

  return (
    <Card className="sm:w-1/2 m-4">
      <CardHeader>
        <CardTitle>Bar Chart </CardTitle>
        <CardDescription>
          Data available for 4 Oct - 29 Oct 2022 chart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={updatedChartData.chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={yAxisKeyName}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey={xAxisKeyName} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey={xAxisKeyName}
              layout="vertical"
              fill="var(--color-value)"
              radius={4}
              onClick={(e) => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString("lineChartFeatureName", e.featureName)
                );
                // calcLineData(e.featureName, chartData);
                setCookie("lineChartFeatureName", e.featureName);
                setFeatureName(e.featureName);
              }}
            >
              <LabelList
                dataKey={yAxisKeyName}
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey={xAxisKeyName}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default memo(HorizontalChart);
