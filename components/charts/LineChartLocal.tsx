"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import * as interfaces from "@/Helpers/interfaces/interface";
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
import moment from "moment";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
import { memo } from "react";

const LineChartLocal = ({
  xAxisKeyName,
  yAxisKeyName,
  chartData,
}: {
  xAxisKeyName: string;
  yAxisKeyName: string;
  chartData: Array<interfaces.inputData>;
}) => {
  return (
    <Card className="sm:w-1/2 m-4 ">
      <CardHeader>
        <CardTitle>
          Line Chart for {yAxisKeyName === "" ? "All" : yAxisKeyName} feature
        </CardTitle>
        <CardDescription className="text-zinc-600">
          Click on bar chart to alter line chart to specific feature
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKeyName}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                moment(value, "YYYY-MM-DD").format("D MMM")
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {yAxisKeyName ? (
              <Line
                dataKey={yAxisKeyName}
                type="linear"
                stroke={
                  "#" +
                  ((Math.random() * 0xffffff) << 0)
                    .toString(16)
                    .padStart(6, "0")
                }
                strokeWidth={2}
                dot={false}
              />
            ) : (
              ["A", "B", "C", "D", "E", "F"].map((feature) => (
                <Line
                  dataKey={feature}
                  type="linear"
                  stroke={
                    "#" +
                    ((Math.random() * 0xffffff) << 0)
                      .toString(16)
                      .padStart(6, "0")
                  }
                  key={Math.random()}
                  strokeWidth={2}
                  dot={false}
                />
              ))
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default memo(LineChartLocal);
