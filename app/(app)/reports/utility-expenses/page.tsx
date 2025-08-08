"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, PieChart, ArrowUpDown, Filter } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface UtilityExpense {
  id: string
  utilityType: "electricity" | "water" | "internet" | "gas" | "telephone"
  accountNumber: string
  location: string
  currentReading?: number
  previousReading?: number
  consumption?: number
  unit?: string
  amount: number
  previousAmount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  billingPeriod: string
  paymentDate?: string
  trend: "increasing" | "decreasing" | "stable"
  percentChange: number
}

const utilityData: UtilityExpense[] = [
  {
    id: "UTL001",
    utilityType: "electricity",
    accountNumber: "ELEC-001-2025",
    location: "Main Campus Building",
    currentReading: 45000,
    previousReading: 42000,
    consumption: 3000,
    unit: "kWh",
    amount: 15000.00,
    previousAmount: 14000.00,
    dueDate: "2025-08-15",
    status: "pending",
    billingPeriod: "July 2025",
    trend: "increasing",
    percentChange: 7.14
  },
  {
    id: "UTL002",
    utilityType: "water",
    accountNumber: "WAT-001-2025",
    location: "Main Campus",
    currentReading: 15000,
    previousReading: 14000,
    consumption: 1000,
    unit: "m³",
    amount: 5000.00,
    previousAmount: 4800.00,
    dueDate: "2025-08-20",
    status: "paid",
    paymentDate: "2025-08-01",
    billingPeriod: "July 2025",
    trend: "stable",
    percentChange: 4.17
  },
  {
    id: "UTL003",
    utilityType: "internet",
    accountNumber: "INT-001-2025",
    location: "Campus Wide",
    amount: 8500.00,
    previousAmount: 8500.00,
    dueDate: "2025-08-10",
    status: "overdue",
    billingPeriod: "July 2025",
    trend: "stable",
    percentChange: 0
  },
  {
    id: "UTL004",
    utilityType: "gas",
    accountNumber: "GAS-001-2025",
    location: "Science Building",
    currentReading: 2500,
    previousReading: 2200,
    consumption: 300,
    unit: "m³",
    amount: 3500.00,
    previousAmount: 3000.00,
    dueDate: "2025-08-25",
    status: "pending",
    billingPeriod: "July 2025",
    trend: "increasing",
    percentChange: 16.67
  },
  {
    id: "UTL005",
    utilityType: "telephone",
    accountNumber: "TEL-001-2025",
    location: "Administrative Building",
    amount: 2000.00,
    previousAmount: 2200.00,
    dueDate: "2025-08-18",
    status: "paid",
    paymentDate: "2025-08-01",
    billingPeriod: "July 2025",
    trend: "decreasing",
    percentChange: -9.09
  }
]

export default function UtilityExpensesPage() {
  const [periodType, setPeriodType] = useState<"monthly" | "quarterly" | "yearly">("monthly")
  
  const totalExpense = utilityData.reduce((sum, utility) => sum + utility.amount, 0)
  const totalPending = utilityData
    .filter(utility => utility.status === "pending")
    .reduce((sum, utility) => sum + utility.amount, 0)
  const totalOverdue = utilityData
    .filter(utility => utility.status === "overdue")
    .reduce((sum, utility) => sum + utility.amount, 0)
  const averageChange = utilityData
    .reduce((sum, utility) => sum + utility.percentChange, 0) / utilityData.length

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Utility Expense Reports</h1>
          <p className="text-muted-foreground">
            Track and analyze utility costs across facilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Location
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Select Period
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilities</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpense.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              For {utilityData.length} accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPending.toLocaleString()}
            </div>
            <Progress 
              value={(totalPending/totalExpense) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${totalOverdue.toLocaleString()}
            </div>
            <Progress 
              value={(totalOverdue/totalExpense) * 100} 
              className="mt-2 bg-red-100" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Change</CardTitle>
            <ArrowUpDown className={`h-4 w-4 ${averageChange >= 0 ? "text-red-500" : "text-green-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageChange.toFixed(1)}%
            </div>
            <p className={`text-xs ${averageChange >= 0 ? "text-red-500" : "text-green-500"}`}>
              From previous period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Utilities Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Utility Details</CardTitle>
              <CardDescription>Detailed view of utility expenses and consumption</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={periodType === "monthly" ? "default" : "outline"} 
                      onClick={() => setPeriodType("monthly")}>
                Monthly
              </Button>
              <Button variant={periodType === "quarterly" ? "default" : "outline"}
                      onClick={() => setPeriodType("quarterly")}>
                Quarterly
              </Button>
              <Button variant={periodType === "yearly" ? "default" : "outline"}
                      onClick={() => setPeriodType("yearly")}>
                Yearly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utility</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Consumption</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utilityData.map((utility) => (
                <TableRow key={utility.id}>
                  <TableCell>
                    <div className="font-medium capitalize">{utility.utilityType}</div>
                    <div className="text-xs text-muted-foreground">{utility.accountNumber}</div>
                  </TableCell>
                  <TableCell>{utility.location}</TableCell>
                  <TableCell>
                    {utility.consumption ? (
                      <div>
                        {utility.consumption.toLocaleString()} {utility.unit}
                        <div className="text-xs text-muted-foreground">
                          Current: {utility.currentReading?.toLocaleString()}
                        </div>
                      </div>
                    ) : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>${utility.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Previous: ${utility.previousAmount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={utility.percentChange > 0 ? "text-red-500" : 
                                   utility.percentChange < 0 ? "text-green-500" : 
                                   "text-muted-foreground"}>
                      {utility.percentChange > 0 ? "+" : ""}
                      {utility.percentChange}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(utility.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      utility.status === "paid" ? "default" :
                      utility.status === "pending" ? "outline" :
                      "destructive"
                    }>
                      {utility.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      utility.trend === "increasing" ? "destructive" :
                      utility.trend === "decreasing" ? "default" :
                      "secondary"
                    }>
                      {utility.trend}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
