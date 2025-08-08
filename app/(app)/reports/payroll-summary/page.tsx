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

interface PayrollEntry {
  id: string
  employeeId: string
  employeeName: string
  department: string
  position: string
  basicSalary: number
  allowances: number
  deductions: number
  netPay: number
  paymentStatus: "paid" | "pending" | "processing"
  paymentDate: string
  payPeriod: string
}

const payrollData: PayrollEntry[] = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    department: "IT",
    position: "Senior Developer",
    basicSalary: 8000.00,
    allowances: 1200.00,
    deductions: 2000.00,
    netPay: 7200.00,
    paymentStatus: "paid",
    paymentDate: "2025-08-01",
    payPeriod: "July 2025"
  },
  {
    id: "PAY002",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    department: "HR",
    position: "HR Manager",
    basicSalary: 7500.00,
    allowances: 1000.00,
    deductions: 1800.00,
    netPay: 6700.00,
    paymentStatus: "paid",
    paymentDate: "2025-08-01",
    payPeriod: "July 2025"
  },
  {
    id: "PAY003",
    employeeId: "EMP003",
    employeeName: "Michael Chen",
    department: "Finance",
    position: "Financial Analyst",
    basicSalary: 7000.00,
    allowances: 900.00,
    deductions: 1700.00,
    netPay: 6200.00,
    paymentStatus: "processing",
    paymentDate: "2025-08-01",
    payPeriod: "July 2025"
  },
  {
    id: "PAY004",
    employeeId: "EMP004",
    employeeName: "Emily Brown",
    department: "Marketing",
    position: "Marketing Director",
    basicSalary: 8500.00,
    allowances: 1500.00,
    deductions: 2200.00,
    netPay: 7800.00,
    paymentStatus: "pending",
    paymentDate: "2025-08-01",
    payPeriod: "July 2025"
  }
]

export default function PayrollSummaryPage() {
  const [periodType, setPeriodType] = useState<"current" | "previous" | "all">("current")
  
  const totalBasicSalary = payrollData.reduce((sum, entry) => sum + entry.basicSalary, 0)
  const totalAllowances = payrollData.reduce((sum, entry) => sum + entry.allowances, 0)
  const totalDeductions = payrollData.reduce((sum, entry) => sum + entry.deductions, 0)
  const totalNetPay = payrollData.reduce((sum, entry) => sum + entry.netPay, 0)

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payroll Summary</h1>
          <p className="text-muted-foreground">
            Employee compensation and payment details
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Department
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Select Pay Period
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
            <CardTitle className="text-sm font-medium">Total Basic Salary</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBasicSalary.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              For {payrollData.length} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allowances</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAllowances.toLocaleString()}
            </div>
            <Progress 
              value={(totalAllowances / totalBasicSalary) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalDeductions.toLocaleString()}
            </div>
            <Progress 
              value={(totalDeductions / totalBasicSalary) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Net Pay</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalNetPay.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalNetPay/totalBasicSalary) * 100).toFixed(1)}% of basic salary
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payroll Details</CardTitle>
              <CardDescription>Employee compensation breakdown</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={periodType === "current" ? "default" : "outline"} 
                      onClick={() => setPeriodType("current")}>
                Current Period
              </Button>
              <Button variant={periodType === "previous" ? "default" : "outline"}
                      onClick={() => setPeriodType("previous")}>
                Previous Period
              </Button>
              <Button variant={periodType === "all" ? "default" : "outline"}
                      onClick={() => setPeriodType("all")}>
                All Periods
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Basic Salary</TableHead>
                <TableHead className="text-right">Allowances</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="font-medium">{entry.employeeName}</div>
                    <div className="text-xs text-muted-foreground">
                      {entry.employeeId} • {entry.position}
                    </div>
                  </TableCell>
                  <TableCell>{entry.department}</TableCell>
                  <TableCell className="text-right">
                    ${entry.basicSalary.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${entry.allowances.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${entry.deductions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${entry.netPay.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      entry.paymentStatus === "paid" ? "default" :
                      entry.paymentStatus === "processing" ? "secondary" :
                      "outline"
                    }>
                      {entry.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(entry.paymentDate).toLocaleDateString()}
                      <div className="text-xs text-muted-foreground">
                        {entry.payPeriod}
                      </div>
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
