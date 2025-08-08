"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  DollarSign, 
  GraduationCap, 
  BookOpen,
  Search,
  Plus,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  program: string
  year: string
  status: "active" | "graduated" | "suspended" | "withdrawn"
  totalFees: number
  paidAmount: number
  balance: number
}

interface StudentFee {
  id: string
  studentId: string
  studentName: string
  feeType: "tuition" | "admission" | "laboratory" | "library" | "miscellaneous"
  amount: number
  paid: number
  balance: number
  dueDate: string
  status: "paid" | "partial" | "overdue" | "upcoming"
  term: string
}

interface Payment {
  id: string
  studentId: string
  studentName: string
  amount: number
  paymentMethod: "cash" | "card" | "bank_transfer" | "check"
  date: string
  reference: string
  feeType: string
}

export default function StudentAccountsTabs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Mock data
  const students: Student[] = [
    {
      id: "STU001",
      name: "John Smith",
      email: "john.smith@email.com",
      program: "Computer Science",
      year: "3rd Year",
      status: "active",
      totalFees: 15000,
      paidAmount: 12000,
      balance: 3000
    },
    {
      id: "STU002", 
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      program: "Business Administration",
      year: "2nd Year",
      status: "active",
      totalFees: 12000,
      paidAmount: 8000,
      balance: 4000
    },
    {
      id: "STU003",
      name: "Michael Johnson",
      email: "michael.j@email.com",
      program: "Computer Science",
      year: "4th Year",
      status: "active",
      totalFees: 16000,
      paidAmount: 16000,
      balance: 0
    }
  ]

  const fees: StudentFee[] = [
    {
      id: "FEE001",
      studentId: "STU001",
      studentName: "John Smith",
      feeType: "tuition",
      amount: 5000,
      paid: 5000,
      balance: 0,
      dueDate: "2024-08-15",
      status: "paid",
      term: "Fall 2024"
    },
    {
      id: "FEE002",
      studentId: "STU002",
      studentName: "Emma Wilson",
      feeType: "tuition",
      amount: 4500,
      paid: 2250,
      balance: 2250,
      dueDate: "2024-08-15",
      status: "partial",
      term: "Fall 2024"
    },
    {
      id: "FEE003",
      studentId: "STU001",
      studentName: "John Smith",
      feeType: "laboratory",
      amount: 800,
      paid: 0,
      balance: 800,
      dueDate: "2024-08-10",
      status: "overdue",
      term: "Fall 2024"
    }
  ]

  const payments: Payment[] = [
    {
      id: "PAY001",
      studentId: "STU001",
      studentName: "John Smith",
      amount: 5000,
      paymentMethod: "bank_transfer",
      date: "2024-08-01",
      reference: "TXN123456",
      feeType: "Tuition Fee"
    },
    {
      id: "PAY002",
      studentId: "STU002",
      studentName: "Emma Wilson",
      amount: 2250,
      paymentMethod: "card",
      date: "2024-08-05",
      reference: "TXN123457",
      feeType: "Tuition Fee"
    }
  ]

  const filteredStudents = students.filter(student =>
    (selectedProgram === "all" || student.program === selectedProgram) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "graduated":
        return <Badge variant="secondary">Graduated</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "withdrawn":
        return <Badge variant="outline">Withdrawn</Badge>
    }
  }

  const getFeeStatusBadge = (status: StudentFee["status"]) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>
      case "partial":
        return <Badge variant="secondary">Partial</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
    }
  }

  const totalStudents = students.length
  const totalRevenue = students.reduce((sum, student) => sum + student.totalFees, 0)
  const totalCollected = students.reduce((sum, student) => sum + student.paidAmount, 0)
  const totalOutstanding = students.reduce((sum, student) => sum + student.balance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Accounts</h1>
          <p className="text-muted-foreground">Manage student information, fees, and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddStudent(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
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
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Expected this term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalCollected.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              {((totalCollected / totalRevenue) * 100).toFixed(1)}% collected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-orange-600">Pending collection</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="fees">Fee Management</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>Manage student information and account status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex items-center flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total Fees</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="text-right">${student.totalFees.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={student.balance > 0 ? "text-orange-600" : "text-green-600"}>
                          ${student.balance.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Management</CardTitle>
              <CardDescription>Track and manage student fees by type and term</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.studentName}</TableCell>
                      <TableCell className="capitalize">{fee.feeType}</TableCell>
                      <TableCell>{fee.term}</TableCell>
                      <TableCell className="text-right">${fee.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${fee.paid.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${fee.balance.toLocaleString()}</TableCell>
                      <TableCell>{fee.dueDate}</TableCell>
                      <TableCell>{getFeeStatusBadge(fee.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowPaymentDialog(true)}
                        >
                          Record Payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all student payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell>{payment.feeType}</TableCell>
                      <TableCell className="text-right">${payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{payment.paymentMethod.replace('_', ' ')}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">Program</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ba">Business Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddStudent(false)}>Cancel</Button>
            <Button onClick={() => setShowAddStudent(false)}>Add Student</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input id="amount" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method" className="text-right">Payment Method</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">Reference</Label>
              <Input id="reference" className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowPaymentDialog(false)}>Record Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
