"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts"

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses", 
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function IncomeExpenseTrends() {
  // Mock data - replace with real data from your API
  const monthlyData = [
    { month: "Jan", income: 180000, expenses: 140000 },
    { month: "Feb", income: 195000, expenses: 155000 },
    { month: "Mar", income: 210000, expenses: 160000 },
    { month: "Apr", income: 225000, expenses: 175000 },
    { month: "May", income: 240000, expenses: 180000 },
    { month: "Jun", income: 255000, expenses: 190000 },
    { month: "Jul", income: 270000, expenses: 195000 },
    { month: "Aug", income: 285000, expenses: 200000 },
    { month: "Sep", income: 300000, expenses: 210000 },
    { month: "Oct", income: 315000, expenses: 220000 },
    { month: "Nov", income: 330000, expenses: 225000 },
    { month: "Dec", income: 345000, expenses: 230000 },
  ]

  const quarterlyData = [
    { quarter: "Q1", income: 585000, expenses: 455000, net: 130000 },
    { quarter: "Q2", income: 720000, expenses: 545000, net: 175000 },
    { quarter: "Q3", income: 855000, expenses: 605000, net: 250000 },
    { quarter: "Q4", income: 990000, expenses: 675000, net: 315000 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Monthly Income vs Expenses Trend */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--color-income)"
                strokeWidth={2}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                name="Expenses"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quarterly Net Income */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Quarterly Net Income</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `Quarter: ${label}`}
              />
              <Bar
                dataKey="net"
                fill="hsl(var(--chart-3))"
                name="Net Income"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
