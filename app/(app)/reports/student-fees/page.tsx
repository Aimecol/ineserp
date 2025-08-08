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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Calendar, 
  Search, 
  Filter,
  BookOpen,
  Users,
  GraduationCap,
  DollarSign
} from "lucide-react"

interface StudentFee {
  id: string
  studentId: string
  studentName: string
  program: string
  term: string
  feeType: "tuition" | "admission" | "laboratory" | "miscellaneous"
  amount: number
  paid: number
  balance: number
  dueDate: string
  status: "paid" | "partial" | "overdue" | "upcoming"
}

interface ProgramSummary {
  program: string
  totalStudents: number
  expectedRevenue: number
  collectedAmount: number
  pendingAmount: number
  collectionRate: number
}

const feeData: StudentFee[] = [
  {
    id: "FEE001",
    studentId: "STU001",
    studentName: "John Smith",
    program: "Computer Science",
    term: "Fall 2025",
    feeType: "tuition",
    amount: 5000.00,
    paid: 5000.00,
    balance: 0.00,
    dueDate: "2025-08-15",
    status: "paid"
  },
  {
    id: "FEE002",
    studentId: "STU002",
    studentName: "Emma Wilson",
    program: "Business Administration",
    term: "Fall 2025",
    feeType: "tuition",
    amount: 4500.00,
    paid: 2250.00,
    balance: 2250.00,
    dueDate: "2025-08-15",
    status: "partial"
  },
  {
    id: "FEE003",
    studentId: "STU003",
    studentName: "Michael Johnson",
    program: "Computer Science",
    term: "Fall 2025",
    feeType: "laboratory",
    amount: 800.00,
    paid: 0.00,
    balance: 800.00,
    dueDate: "2025-08-10",
    status: "overdue"
  }
]

const programSummaries: ProgramSummary[] = [
  {
    program: "Computer Science",
    totalStudents: 120,
    expectedRevenue: 600000.00,
    collectedAmount: 450000.00,
    pendingAmount: 150000.00,
    collectionRate: 75.00
  },
  {
    program: "Business Administration",
    totalStudents: 150,
    expectedRevenue: 675000.00,
    collectedAmount: 540000.00,
    pendingAmount: 135000.00,
    collectionRate: 80.00
  },
  {
    program: "Engineering",
    totalStudents: 100,
    expectedRevenue: 550000.00,
    collectedAmount: 385000.00,
    pendingAmount: 165000.00,
    collectionRate: 70.00
  }
]

export default function StudentFeePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [selectedTerm, setSelectedTerm] = useState<string>("Fall 2025")
  const [viewMode, setViewMode] = useState<"list" | "summary">("summary")

  const filteredFees = feeData.filter(fee => 
    (selectedProgram === "all" || fee.program === selectedProgram) &&
    fee.term === selectedTerm &&
    (fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Calculate totals
  const totals = {
    totalExpected: programSummaries.reduce((sum, prog) => sum + prog.expectedRevenue, 0),
    totalCollected: programSummaries.reduce((sum, prog) => sum + prog.collectedAmount, 0),
    totalPending: programSummaries.reduce((sum, prog) => sum + prog.pendingAmount, 0),
    averageCollection: programSummaries.reduce((sum, prog) => sum + prog.collectionRate, 0) / programSummaries.length
  }

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Fee Reports</h1>
          <p className="text-muted-foreground">
            Fee collection analysis by program and term
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Select Term
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programSummaries.reduce((sum, prog) => sum + prog.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all programs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalExpected.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total billable amount
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalCollected.toLocaleString()}
            </div>
            <p className="text-xs text-green-500">
              {((totals.totalCollected / totals.totalExpected) * 100).toFixed(1)}% collected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-red-500">
              {((totals.totalPending / totals.totalExpected) * 100).toFixed(1)}% pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search by student name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setViewMode("summary")}
                className={viewMode === "summary" ? "bg-primary text-primary-foreground" : ""}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Program Summary
              </Button>
              <Button 
                variant="outline"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
              >
                <Users className="h-4 w-4 mr-2" />
                Student List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program Summary View */}
      {viewMode === "summary" && (
        <Card>
          <CardHeader>
            <CardTitle>Program-wise Collection Summary</CardTitle>
            <CardDescription>Fee collection status by academic program</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead className="text-right">Expected Revenue</TableHead>
                  <TableHead className="text-right">Collected</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-right">Collection Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programSummaries.map((program) => (
                  <TableRow key={program.program}>
                    <TableCell className="font-medium">{program.program}</TableCell>
                    <TableCell>{program.totalStudents}</TableCell>
                    <TableCell className="text-right">
                      ${program.expectedRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${program.collectedAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${program.pendingAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={
                        program.collectionRate >= 80 ? "default" :
                        program.collectionRate >= 60 ? "secondary" : "destructive"
                      }>
                        {program.collectionRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Student List View */}
      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Student Fee Details</CardTitle>
            <CardDescription>Individual student fee status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Fee Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.studentId}</TableCell>
                    <TableCell>{fee.studentName}</TableCell>
                    <TableCell>{fee.program}</TableCell>
                    <TableCell className="capitalize">{fee.feeType}</TableCell>
                    <TableCell className="text-right">${fee.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${fee.paid.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${fee.balance.toLocaleString()}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={
                        fee.status === "paid" ? "default" :
                        fee.status === "partial" ? "secondary" :
                        fee.status === "overdue" ? "destructive" : "outline"
                      }>
                        {fee.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
