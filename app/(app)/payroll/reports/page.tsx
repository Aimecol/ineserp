"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bar, Line } from "react-chartjs-2"
import { FileDown, Printer } from "lucide-react"

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const payrollData = {
  monthly: {
    labels: months,
    datasets: [
      {
        label: 'Gross Salary',
        data: [175000, 178000, 182000, 185000, 181000, 189000, 192000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Net Salary',
        data: [140000, 142000, 145000, 148000, 144000, 151000, 153000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  },
  deductions: {
    labels: months,
    datasets: [
      {
        label: 'PAYE',
        data: [25000, 26000, 27000, 27500, 27000, 28000, 28500],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'RSSB',
        data: [5000, 5100, 5200, 5300, 5200, 5400, 5500],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Medical Insurance',
        data: [5000, 5000, 5000, 5000, 5000, 5000, 5000],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  }
}

export default function PayrollReportsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payroll Reports</h2>
          <p className="text-muted-foreground">
            Comprehensive payroll reports and analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$192,000.00</div>
            <p className="text-xs text-muted-foreground">+1.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,800.00</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$39,000.00</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Payroll Overview</TabsTrigger>
          <TabsTrigger value="deductions">Deductions Analysis</TabsTrigger>
          <TabsTrigger value="department">Department Wise</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payroll Trend</CardTitle>
              <CardDescription>Gross vs Net Salary comparison</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Line
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index' as const,
                    intersect: false,
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                data={payrollData.monthly}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deductions Analysis</CardTitle>
              <CardDescription>Monthly breakdown of different deductions</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Bar
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
                data={payrollData.deductions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Wise Payroll</CardTitle>
              <CardDescription>Payroll distribution across departments</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Bar
                options={{
                  responsive: true,
                  indexAxis: 'y' as const,
                }}
                data={{
                  labels: ['IT', 'HR', 'Finance', 'Sales', 'Operations'],
                  datasets: [
                    {
                      label: 'Monthly Payroll',
                      data: [58000, 32000, 45000, 38000, 19000],
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }
                  ]
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
