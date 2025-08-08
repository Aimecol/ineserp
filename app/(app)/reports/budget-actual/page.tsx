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
import { Download, Calendar, PieChart, Filter } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BudgetLine {
  id: string
  category: string
  subcategory: string
  department: string
  budgeted: number
  actual: number
  variance: number
  variancePercent: number
  status: "under-budget" | "on-target" | "over-budget"
  notes?: string
  period: string
  lastUpdated: string
}

const budgetData: BudgetLine[] = [
  {
    id: "BUD001",
    category: "Academic",
    subcategory: "Faculty Salaries",
    department: "Academic Affairs",
    budgeted: 2500000.00,
    actual: 2450000.00,
    variance: 50000.00,
    variancePercent: 2,
    status: "under-budget",
    period: "2025 Q3",
    lastUpdated: "2025-08-01"
  },
  {
    id: "BUD002",
    category: "Administrative",
    subcategory: "Office Supplies",
    department: "Administration",
    budgeted: 150000.00,
    actual: 165000.00,
    variance: -15000.00,
    variancePercent: -10,
    status: "over-budget",
    notes: "Unexpected price increases",
    period: "2025 Q3",
    lastUpdated: "2025-08-01"
  },
  {
    id: "BUD003",
    category: "Facilities",
    subcategory: "Maintenance",
    department: "Facilities",
    budgeted: 800000.00,
    actual: 795000.00,
    variance: 5000.00,
    variancePercent: 0.625,
    status: "on-target",
    period: "2025 Q3",
    lastUpdated: "2025-08-01"
  },
  {
    id: "BUD004",
    category: "Technology",
    subcategory: "IT Infrastructure",
    department: "IT",
    budgeted: 450000.00,
    actual: 480000.00,
    variance: -30000.00,
    variancePercent: -6.67,
    status: "over-budget",
    notes: "Emergency server upgrades",
    period: "2025 Q3",
    lastUpdated: "2025-08-01"
  }
]

export default function BudgetActualPage() {
  const [periodType, setPeriodType] = useState<"current" | "ytd" | "projected">("current")
  
  const totalBudgeted = budgetData.reduce((sum, line) => sum + line.budgeted, 0)
  const totalActual = budgetData.reduce((sum, line) => sum + line.actual, 0)
  const totalVariance = budgetData.reduce((sum, line) => sum + line.variance, 0)
  const overallVariancePercent = (totalVariance / totalBudgeted) * 100

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Budget vs Actual</h1>
          <p className="text-muted-foreground">
            Compare budgeted amounts with actual spending
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Department
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
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBudgeted.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {budgetData.length} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actual</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalActual.toLocaleString()}
            </div>
            <Progress value={(totalActual/totalBudgeted) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Variance</CardTitle>
            <PieChart className={`h-4 w-4 ${totalVariance >= 0 ? "text-green-500" : "text-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalVariance >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${totalVariance.toLocaleString()}
            </div>
            <p className={`text-xs ${totalVariance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {overallVariancePercent.toFixed(1)}% {totalVariance >= 0 ? "under budget" : "over budget"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalActual/totalBudgeted) * 100).toFixed(1)}%
            </div>
            <Progress value={(totalActual/totalBudgeted) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Budget Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Budget Details</CardTitle>
              <CardDescription>Detailed comparison of budget vs actual spending</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={periodType === "current" ? "default" : "outline"} 
                      onClick={() => setPeriodType("current")}>
                Current Period
              </Button>
              <Button variant={periodType === "ytd" ? "default" : "outline"}
                      onClick={() => setPeriodType("ytd")}>
                Year to Date
              </Button>
              <Button variant={periodType === "projected" ? "default" : "outline"}
                      onClick={() => setPeriodType("projected")}>
                Projected
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budgeted</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <div className="font-medium">{line.category}</div>
                    <div className="text-xs text-muted-foreground">{line.subcategory}</div>
                  </TableCell>
                  <TableCell>{line.department}</TableCell>
                  <TableCell className="text-right">
                    ${line.budgeted.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${line.actual.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={line.variance >= 0 ? "text-green-500" : "text-red-500"}>
                      {line.variance >= 0 ? "+" : ""}${line.variance.toLocaleString()}
                      <div className="text-xs">
                        ({line.variance >= 0 ? "+" : ""}{line.variancePercent}%)
                      </div>
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(line.actual/line.budgeted) * 100} />
                      <span className="text-sm">
                        {((line.actual/line.budgeted) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      line.status === "under-budget" ? "default" :
                      line.status === "on-target" ? "secondary" :
                      "destructive"
                    }>
                      {line.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {line.notes || "—"}
                    </div>
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
