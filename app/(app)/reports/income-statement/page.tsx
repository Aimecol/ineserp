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
import { Download, Calendar, ArrowUpDown, ChevronsUpDown } from "lucide-react"

interface IncomeStatement {
  category: string
  amount: number
  previousAmount: number
  change: number
  changePercent: number
  type: "revenue" | "expense" | "subtotal" | "total"
}

const incomeData: IncomeStatement[] = [
  // Revenue
  {
    category: "Revenue",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Student Fees",
    amount: 500000.00,
    previousAmount: 450000.00,
    change: 50000.00,
    changePercent: 11.11,
    type: "revenue"
  },
  {
    category: "Admission Fees",
    amount: 75000.00,
    previousAmount: 70000.00,
    change: 5000.00,
    changePercent: 7.14,
    type: "revenue"
  },
  {
    category: "Other Income",
    amount: 25000.00,
    previousAmount: 20000.00,
    change: 5000.00,
    changePercent: 25.00,
    type: "revenue"
  },
  {
    category: "Total Revenue",
    amount: 600000.00,
    previousAmount: 540000.00,
    change: 60000.00,
    changePercent: 11.11,
    type: "subtotal"
  },
  // Expenses
  {
    category: "Expenses",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Staff Salaries",
    amount: 250000.00,
    previousAmount: 230000.00,
    change: 20000.00,
    changePercent: 8.70,
    type: "expense"
  },
  {
    category: "Administrative Expenses",
    amount: 50000.00,
    previousAmount: 45000.00,
    change: 5000.00,
    changePercent: 11.11,
    type: "expense"
  },
  {
    category: "Maintenance",
    amount: 30000.00,
    previousAmount: 25000.00,
    change: 5000.00,
    changePercent: 20.00,
    type: "expense"
  },
  {
    category: "Utilities",
    amount: 40000.00,
    previousAmount: 35000.00,
    change: 5000.00,
    changePercent: 14.29,
    type: "expense"
  },
  {
    category: "Total Expenses",
    amount: 370000.00,
    previousAmount: 335000.00,
    change: 35000.00,
    changePercent: 10.45,
    type: "subtotal"
  },
  // Net Income
  {
    category: "Net Income",
    amount: 230000.00,
    previousAmount: 205000.00,
    change: 25000.00,
    changePercent: 12.20,
    type: "total"
  }
]

export default function IncomeStatementPage() {
  const [periodType, setPeriodType] = useState<"monthly" | "quarterly" | "yearly">("monthly")
  const currentPeriod = "August 2025"
  const previousPeriod = "July 2025"

  const totalRevenue = incomeData.find(item => item.category === "Total Revenue")
  const totalExpenses = incomeData.find(item => item.category === "Total Expenses")
  const netIncome = incomeData.find(item => item.category === "Net Income")

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Income Statement</h1>
          <p className="text-muted-foreground">
            Financial performance for period ending {currentPeriod}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Change Period
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ArrowUpDown className={`h-4 w-4 ${(totalRevenue?.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue?.amount.toLocaleString()}
            </div>
            <p className={`text-xs ${(totalRevenue?.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
              {(totalRevenue?.change ?? 0) >= 0 ? "+" : ""}{totalRevenue?.changePercent ?? 0}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowUpDown className={`h-4 w-4 ${(totalExpenses?.change ?? 0) >= 0 ? "text-red-500" : "text-green-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpenses?.amount.toLocaleString()}
            </div>
            <p className={`text-xs ${(totalExpenses?.change ?? 0) >= 0 ? "text-red-500" : "text-green-500"}`}>
              {(totalExpenses?.change ?? 0) >= 0 ? "+" : ""}{totalExpenses?.changePercent ?? 0}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <ArrowUpDown className={`h-4 w-4 ${(netIncome?.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${netIncome?.amount.toLocaleString()}
            </div>
            <p className={`text-xs ${(netIncome?.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
              {(netIncome?.change ?? 0) >= 0 ? "+" : ""}{netIncome?.changePercent ?? 0}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statement Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Statement Details</CardTitle>
              <CardDescription>Comparison with {previousPeriod}</CardDescription>
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
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Current Period</TableHead>
                <TableHead className="text-right">Previous Period</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData.map((item, index) => (
                <TableRow key={index} className={
                  item.type === "total" ? "font-bold bg-muted" :
                  item.type === "subtotal" ? "font-semibold bg-muted/50" : ""
                }>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    {item.type !== "subtotal" && "$"}
                    {item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.type !== "subtotal" && "$"}
                    {item.previousAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.type !== "subtotal" && (
                      <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                        {item.change >= 0 ? "+" : ""}{item.change.toLocaleString()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.type !== "subtotal" && (
                      <Badge variant={item.change >= 0 ? "default" : "destructive"}>
                        {item.change >= 0 ? "+" : ""}{item.changePercent}%
                      </Badge>
                    )}
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
