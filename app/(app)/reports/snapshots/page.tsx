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
import { Download, Calendar, PieChart, ArrowUpDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FinancialSnapshot {
  id: string
  date: string
  type: "daily" | "weekly" | "monthly"
  cashBalance: number
  totalReceivables: number
  totalPayables: number
  revenueToDate: number
  expensesToDate: number
  netPosition: number
  changePercent: number
  trending: "up" | "down" | "stable"
  keyMetrics: {
    name: string
    value: number
    trend: "increasing" | "decreasing" | "stable"
    changePercent: number
  }[]
}

const snapshotData: FinancialSnapshot[] = [
  {
    id: "SNP001",
    date: "2025-08-08",
    type: "daily",
    cashBalance: 1500000.00,
    totalReceivables: 750000.00,
    totalPayables: 500000.00,
    revenueToDate: 5000000.00,
    expensesToDate: 4200000.00,
    netPosition: 800000.00,
    changePercent: 2.5,
    trending: "up",
    keyMetrics: [
      {
        name: "Current Ratio",
        value: 2.1,
        trend: "increasing",
        changePercent: 5
      },
      {
        name: "Quick Ratio",
        value: 1.8,
        trend: "stable",
        changePercent: 0
      },
      {
        name: "Operating Margin",
        value: 15.5,
        trend: "increasing",
        changePercent: 3
      }
    ]
  },
  {
    id: "SNP002",
    date: "2025-08-01",
    type: "weekly",
    cashBalance: 1450000.00,
    totalReceivables: 800000.00,
    totalPayables: 550000.00,
    revenueToDate: 4800000.00,
    expensesToDate: 4000000.00,
    netPosition: 780000.00,
    changePercent: -1.2,
    trending: "down",
    keyMetrics: [
      {
        name: "Current Ratio",
        value: 2.0,
        trend: "decreasing",
        changePercent: -2
      },
      {
        name: "Quick Ratio",
        value: 1.8,
        trend: "stable",
        changePercent: 0
      },
      {
        name: "Operating Margin",
        value: 15.0,
        trend: "decreasing",
        changePercent: -1
      }
    ]
  },
  {
    id: "SNP003",
    date: "2025-07-01",
    type: "monthly",
    cashBalance: 1400000.00,
    totalReceivables: 700000.00,
    totalPayables: 480000.00,
    revenueToDate: 4500000.00,
    expensesToDate: 3800000.00,
    netPosition: 700000.00,
    changePercent: 5.0,
    trending: "up",
    keyMetrics: [
      {
        name: "Current Ratio",
        value: 1.9,
        trend: "increasing",
        changePercent: 6
      },
      {
        name: "Quick Ratio",
        value: 1.7,
        trend: "increasing",
        changePercent: 4
      },
      {
        name: "Operating Margin",
        value: 14.8,
        trend: "stable",
        changePercent: 0
      }
    ]
  }
]

export default function SnapshotsPage() {
  const [snapshotType, setSnapshotType] = useState<"daily" | "weekly" | "monthly">("daily")
  
  // Get latest snapshot
  const latestSnapshot = snapshotData[0]

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Financial Snapshots</h1>
          <p className="text-muted-foreground">
            Daily, weekly, and monthly financial position summaries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Select Date
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
            <CardTitle className="text-sm font-medium">Cash Position</CardTitle>
            <ArrowUpDown className={`h-4 w-4 ${latestSnapshot.trending === "up" ? "text-green-500" : "text-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${latestSnapshot.cashBalance.toLocaleString()}
            </div>
            <p className={`text-xs ${latestSnapshot.changePercent >= 0 ? "text-green-500" : "text-red-500"}`}>
              {latestSnapshot.changePercent >= 0 ? "+" : ""}{latestSnapshot.changePercent}% from previous
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Position</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${latestSnapshot.netPosition.toLocaleString()}
            </div>
            <Progress 
              value={(latestSnapshot.netPosition/latestSnapshot.revenueToDate) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receivables</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${latestSnapshot.totalReceivables.toLocaleString()}
            </div>
            <Progress 
              value={(latestSnapshot.totalReceivables/latestSnapshot.revenueToDate) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payables</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${latestSnapshot.totalPayables.toLocaleString()}
            </div>
            <Progress 
              value={(latestSnapshot.totalPayables/latestSnapshot.expensesToDate) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Key Financial Metrics</CardTitle>
              <CardDescription>Current period performance indicators</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={snapshotType === "daily" ? "default" : "outline"} 
                      onClick={() => setSnapshotType("daily")}>
                Daily
              </Button>
              <Button variant={snapshotType === "weekly" ? "default" : "outline"}
                      onClick={() => setSnapshotType("weekly")}>
                Weekly
              </Button>
              <Button variant={snapshotType === "monthly" ? "default" : "outline"}
                      onClick={() => setSnapshotType("monthly")}>
                Monthly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Cash Balance</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Net Position</TableHead>
                <TableHead>Current Ratio</TableHead>
                <TableHead>Quick Ratio</TableHead>
                <TableHead>Operating Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snapshotData
                .filter(snapshot => snapshot.type === snapshotType)
                .map((snapshot) => (
                <TableRow key={snapshot.id}>
                  <TableCell>
                    {new Date(snapshot.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${snapshot.cashBalance.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${snapshot.revenueToDate.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${snapshot.expensesToDate.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={snapshot.netPosition >= 0 ? "text-green-500" : "text-red-500"}>
                      ${snapshot.netPosition.toLocaleString()}
                    </span>
                  </TableCell>
                  {snapshot.keyMetrics.map((metric, index) => (
                    <TableCell key={index}>
                      <div className="flex items-center gap-2">
                        <span>{metric.value.toFixed(1)}</span>
                        <Badge variant={
                          metric.trend === "increasing" ? "default" :
                          metric.trend === "decreasing" ? "destructive" :
                          "secondary"
                        }>
                          {metric.changePercent >= 0 ? "+" : ""}{metric.changePercent}%
                        </Badge>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
