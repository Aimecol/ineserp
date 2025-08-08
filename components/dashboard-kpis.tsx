"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  BookOpen,
  PieChart,
  ArrowUpDown
} from "lucide-react"

export function DashboardKPIs() {
  // Mock data - replace with real data from your API
  const kpiData = {
    totalRevenue: 2450000,
    totalExpenses: 1890000,
    netIncome: 560000,
    studentCount: 1250,
    facultyCount: 85,
    activeProjects: 12,
    budgetUtilization: 77.2,
    donorFunds: 890000,
    remainingBudget: 560000
  }

  const revenueGrowth = 12.5
  const expenseGrowth = -3.2
  const studentGrowth = 8.1

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${kpiData.totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+{revenueGrowth}%</span> from last month
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${kpiData.totalExpenses.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">{expenseGrowth}%</span> from last month
          </p>
        </CardContent>
      </Card>

      {/* Net Income */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ${kpiData.netIncome.toLocaleString()}
          </div>
          <Progress value={(kpiData.netIncome / kpiData.totalRevenue) * 100} className="mt-2" />
        </CardContent>
      </Card>

      {/* Student Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpiData.studentCount.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+{studentGrowth}%</span> from last semester
          </p>
        </CardContent>
      </Card>

      {/* Faculty Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpiData.facultyCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Across all departments
          </p>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpiData.activeProjects}
          </div>
          <p className="text-xs text-muted-foreground">
            Research & development
          </p>
        </CardContent>
      </Card>

      {/* Budget Utilization */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpiData.budgetUtilization}%
          </div>
          <Progress value={kpiData.budgetUtilization} className="mt-2" />
        </CardContent>
      </Card>

      {/* Donor Funds */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Donor Funds</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${kpiData.donorFunds.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Available for allocation
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
