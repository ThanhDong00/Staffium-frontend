"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartTitles = ["Attedance Rate", "Late Rate", "Off Rate"];
const chartData = [{ percent: 92 }, { percent: 23 }, { percent: 100 - 92 }];
const trendData = [
  {
    isUp: true,
    percent: 2,
  },
  {
    isUp: false,
    percent: 12,
  },
  {
    isUp: false,
    percent: 1,
  },
];

const chartConfig = {
  percent: {
    label: "percent",
    color: "#6366F1",
  },
} satisfies ChartConfig;

// assume that start angle is 0
function angleCalc(currentValue: number, maxValue: number): number {
  if (maxValue === 0) {
    throw new Error("maxValue can't be zero.");
  }
  return Math.floor((currentValue * 360) / maxValue);
}

const TrendingTextFromData = (isUp: boolean, percent: number) => {
  let trendText = isUp ? "up" : "down";
  let trendIcon = isUp ? (
    <TrendingUp className="h-4 w-4" />
  ) : (
    <TrendingDown className="h-4 w-4" />
  );

  return (
    <div className="flex items-center gap-2 font-sm leading-none">
      Trending {trendText} by {percent}% this month {trendIcon}
    </div>
  );
};
const ChartsToolTip = () => {
  return (
    <div className="flex flex-row gap-4 p-4">
      {chartTitles.map((title, index) => (
        <Card key={`chart-${index}`} className="flex flex-col w-64">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription className="text-xs">January 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[140px]"
            >
              <RadialBarChart
                data={[chartData[index]]} // this attribute requires an array
                startAngle={0}
                endAngle={angleCalc(chartData[index].percent, 100)}
                innerRadius={50}
                outerRadius={80}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[56, 44]}
                />
                <RadialBar
                  dataKey="percent"
                  background
                  fill="var(--color-percent)"
                  cornerRadius={10}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xl font-bold"
                            >
                              {chartData[index].percent}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Percent
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-xs px-4">
            {TrendingTextFromData(
              trendData[index].isUp,
              trendData[index].percent
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ChartsToolTip;
