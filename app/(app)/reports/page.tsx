"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

// Data for recharts
const expenditureData = [
  { month: 'Jan', expenditure: 65000 },
  { month: 'Feb', expenditure: 59000 },
  { month: 'Mar', expenditure: 80000 },
  { month: 'Apr', expenditure: 81000 },
  { month: 'May', expenditure: 56000 },
  { month: 'Jun', expenditure: 75000 },
]

const assetsData = [
  { name: 'Buildings', value: 45, fill: '#ff6384' },
  { name: 'IT Equipment', value: 25, fill: '#36a2eb' },
  { name: 'Vehicles', value: 15, fill: '#ffce56' },
  { name: 'Furniture', value: 10, fill: '#4bc0c0' },
  { name: 'Other', value: 5, fill: '#9966ff' },
]

const procurementData = [
  { month: 'Jan', orders: 12 },
  { month: 'Feb', orders: 19 },
  { month: 'Mar', orders: 15 },
  { month: 'Apr', orders: 17 },
  { month: 'May', orders: 14 },
  { month: 'Jun', orders: 18 },
]

const payrollData = [
  { month: 'Jan', payroll: 145000 },
  { month: 'Feb', payroll: 148000 },
  { month: 'Mar', payroll: 152000 },
  { month: 'Apr', payroll: 151000 },
  { month: 'May', payroll: 154000 },
  { month: 'Jun', payroll: 152000 },
]

const chartConfig = {
  expenditure: {
    label: "Expenditure",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Purchase Orders",
    color: "hsl(var(--chart-2))",
  },
  payroll: {
    label: "Payroll Expenses",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<Date[]>([])

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button>Download Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="procurement">Procurement</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenditure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$416,000.00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Purchase Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+2 since last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asset Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.2M</div>
                <p className="text-xs text-muted-foreground">+5% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$152,000.00</div>
                <p className="text-xs text-muted-foreground">For current month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Expenditure Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={expenditureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Expenditure"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenditure"
                      stroke="var(--color-expenditure)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Asset Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={assetsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {assetsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders Overview</CardTitle>
              <CardDescription>Monthly procurement activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={procurementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [value, "Purchase Orders"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar
                    dataKey="orders"
                    fill="var(--color-orders)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Distribution</CardTitle>
              <CardDescription>By category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={assetsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {assetsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Trends</CardTitle>
              <CardDescription>Monthly payroll expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Payroll"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="payroll"
                    stroke="var(--color-payroll)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
