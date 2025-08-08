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

interface BalanceSheetItem {
  category: string
  amount: number
  previousAmount: number
  change: number
  changePercent: number
  type: "asset" | "liability" | "equity" | "subtotal" | "total"
}

const balanceData: BalanceSheetItem[] = [
  // Assets
  {
    category: "Assets",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Current Assets",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Cash and Equivalents",
    amount: 250000.00,
    previousAmount: 200000.00,
    change: 50000.00,
    changePercent: 25.00,
    type: "asset"
  },
  {
    category: "Accounts Receivable",
    amount: 150000.00,
    previousAmount: 120000.00,
    change: 30000.00,
    changePercent: 25.00,
    type: "asset"
  },
  {
    category: "Total Current Assets",
    amount: 400000.00,
    previousAmount: 320000.00,
    change: 80000.00,
    changePercent: 25.00,
    type: "subtotal"
  },
  {
    category: "Fixed Assets",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Property and Equipment",
    amount: 800000.00,
    previousAmount: 750000.00,
    change: 50000.00,
    changePercent: 6.67,
    type: "asset"
  },
  {
    category: "Less: Accumulated Depreciation",
    amount: -100000.00,
    previousAmount: -80000.00,
    change: -20000.00,
    changePercent: 25.00,
    type: "asset"
  },
  {
    category: "Total Fixed Assets",
    amount: 700000.00,
    previousAmount: 670000.00,
    change: 30000.00,
    changePercent: 4.48,
    type: "subtotal"
  },
  {
    category: "Total Assets",
    amount: 1100000.00,
    previousAmount: 990000.00,
    change: 110000.00,
    changePercent: 11.11,
    type: "total"
  },
  // Liabilities
  {
    category: "Liabilities",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Current Liabilities",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Accounts Payable",
    amount: 80000.00,
    previousAmount: 70000.00,
    change: 10000.00,
    changePercent: 14.29,
    type: "liability"
  },
  {
    category: "Accrued Expenses",
    amount: 40000.00,
    previousAmount: 35000.00,
    change: 5000.00,
    changePercent: 14.29,
    type: "liability"
  },
  {
    category: "Total Current Liabilities",
    amount: 120000.00,
    previousAmount: 105000.00,
    change: 15000.00,
    changePercent: 14.29,
    type: "subtotal"
  },
  {
    category: "Long-term Liabilities",
    amount: 300000.00,
    previousAmount: 320000.00,
    change: -20000.00,
    changePercent: -6.25,
    type: "liability"
  },
  {
    category: "Total Liabilities",
    amount: 420000.00,
    previousAmount: 425000.00,
    change: -5000.00,
    changePercent: -1.18,
    type: "total"
  },
  // Equity
  {
    category: "Equity",
    amount: 0,
    previousAmount: 0,
    change: 0,
    changePercent: 0,
    type: "subtotal"
  },
  {
    category: "Capital",
    amount: 450000.00,
    previousAmount: 450000.00,
    change: 0.00,
    changePercent: 0.00,
    type: "equity"
  },
  {
    category: "Retained Earnings",
    amount: 230000.00,
    previousAmount: 115000.00,
    change: 115000.00,
    changePercent: 100.00,
    type: "equity"
  },
  {
    category: "Total Equity",
    amount: 680000.00,
    previousAmount: 565000.00,
    change: 115000.00,
    changePercent: 20.35,
    type: "total"
  },
  // Total Liabilities and Equity
  {
    category: "Total Liabilities and Equity",
    amount: 1100000.00,
    previousAmount: 990000.00,
    change: 110000.00,
    changePercent: 11.11,
    type: "total"
  }
]

export default function BalanceSheetPage() {
  const [asOf, setAsOf] = useState(new Date())
  const currentPeriod = "August 8, 2025"
  const previousPeriod = "July 31, 2025"

  const totalAssets = balanceData.find(item => item.category === "Total Assets")
  const totalLiabilities = balanceData.find(item => item.category === "Total Liabilities")
  const totalEquity = balanceData.find(item => item.category === "Total Equity")

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Balance Sheet</h1>
          <p className="text-muted-foreground">
            As of {currentPeriod}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Change Date
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
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAssets?.amount.toLocaleString()}
            </div>
            <p className="text-xs text-green-500">
              +{totalAssets?.changePercent}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalLiabilities?.amount.toLocaleString()}
            </div>
            <p className="text-xs text-red-500">
              {totalLiabilities?.changePercent}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalEquity?.amount.toLocaleString()}
            </div>
            <p className="text-xs text-green-500">
              +{totalEquity?.changePercent}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Balance Sheet Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Statement Details</CardTitle>
              <CardDescription>Comparison with {previousPeriod}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">Previous</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {balanceData.map((item, index) => (
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
                        {item.change >= 0 ? "+" : ""}${Math.abs(item.change).toLocaleString()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.type !== "subtotal" && item.changePercent !== 0 && (
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
