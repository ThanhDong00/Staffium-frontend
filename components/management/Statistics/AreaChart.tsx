"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", work: 222, off: 150 },
  { date: "2024-04-02", work: 97, off: 180 },
  { date: "2024-04-03", work: 167, off: 120 },
  { date: "2024-04-04", work: 242, off: 260 },
  { date: "2024-04-05", work: 373, off: 290 },
  { date: "2024-04-06", work: 301, off: 340 },
  { date: "2024-04-07", work: 245, off: 180 },
  { date: "2024-04-08", work: 409, off: 320 },
  { date: "2024-04-09", work: 59, off: 110 },
  { date: "2024-04-10", work: 261, off: 190 },
  { date: "2024-04-11", work: 327, off: 350 },
  { date: "2024-04-12", work: 292, off: 210 },
  { date: "2024-04-13", work: 342, off: 380 },
  { date: "2024-04-14", work: 137, off: 220 },
  { date: "2024-04-15", work: 120, off: 170 },
  { date: "2024-04-16", work: 138, off: 190 },
  { date: "2024-04-17", work: 446, off: 360 },
  { date: "2024-04-18", work: 364, off: 410 },
  { date: "2024-04-19", work: 243, off: 180 },
  { date: "2024-04-20", work: 89, off: 150 },
  { date: "2024-04-21", work: 137, off: 200 },
  { date: "2024-04-22", work: 224, off: 170 },
  { date: "2024-04-23", work: 138, off: 230 },
  { date: "2024-04-24", work: 387, off: 290 },
  { date: "2024-04-25", work: 215, off: 250 },
  { date: "2024-04-26", work: 75, off: 130 },
  { date: "2024-04-27", work: 383, off: 420 },
  { date: "2024-04-28", work: 122, off: 180 },
  { date: "2024-04-29", work: 315, off: 240 },
  { date: "2024-04-30", work: 454, off: 380 },
];

const chartConfig = {
  work: {
    label: "Work",
    color: "#6366F1",
  },
  off: {
    label: "Off",
    color: "#A5B4FC",
  },
} satisfies ChartConfig;

const MyAreaChart = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-sm">Area Chart</CardTitle>
          <CardDescription>Attendance in January 2024</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
          // showLegend
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillWork" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.work.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.work.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOff" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.off.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.off.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              dataKey="off"
              type="monotone"
              fill="url(#fillOff)"
              stroke={chartConfig.off.color}
              fillOpacity={0.6}
              stackId="a"
            />
            <Area
              dataKey="work"
              type="monotone"
              fill="url(#fillWork)"
              stroke={chartConfig.work.color}
              fillOpacity={0.6}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MyAreaChart;
