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
import { Download, Calendar, PieChart, Search, Filter } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface VendorPayment {
  id: string
  vendorId: string
  vendorName: string
  invoiceNumber: string
  amount: number
  dueDate: string
  paymentDate: string | null
  category: string
  status: "paid" | "pending" | "overdue" | "scheduled"
  paymentMethod: string
  approvalStatus: "approved" | "pending" | "rejected"
  aging: number
}

const vendorData: VendorPayment[] = [
  {
    id: "VPY001",
    vendorId: "VEN001",
    vendorName: "Office Supplies Co.",
    invoiceNumber: "INV2025001",
    amount: 12500.00,
    dueDate: "2025-08-15",
    paymentDate: "2025-08-01",
    category: "Supplies",
    status: "paid",
    paymentMethod: "Bank Transfer",
    approvalStatus: "approved",
    aging: 0
  },
  {
    id: "VPY002",
    vendorId: "VEN002",
    vendorName: "Tech Solutions Inc.",
    invoiceNumber: "INV2025002",
    amount: 45000.00,
    dueDate: "2025-08-30",
    paymentDate: null,
    category: "IT Services",
    status: "pending",
    paymentMethod: "Bank Transfer",
    approvalStatus: "pending",
    aging: 15
  },
  {
    id: "VPY003",
    vendorId: "VEN003",
    vendorName: "Maintenance Services Ltd.",
    invoiceNumber: "INV2025003",
    amount: 8500.00,
    dueDate: "2025-07-30",
    paymentDate: null,
    category: "Maintenance",
    status: "overdue",
    paymentMethod: "Check",
    approvalStatus: "approved",
    aging: 45
  },
  {
    id: "VPY004",
    vendorId: "VEN004",
    vendorName: "Educational Resources Corp",
    invoiceNumber: "INV2025004",
    amount: 28000.00,
    dueDate: "2025-09-15",
    paymentDate: null,
    category: "Educational Materials",
    status: "scheduled",
    paymentMethod: "Bank Transfer",
    approvalStatus: "approved",
    aging: 0
  }
]

export default function VendorPaymentsPage() {
  const [viewType, setViewType] = useState<"all" | "pending" | "paid" | "overdue">("all")
  
  const totalPayable = vendorData.reduce((sum, payment) => sum + payment.amount, 0)
  const totalPaid = vendorData
    .filter(payment => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const totalPending = vendorData
    .filter(payment => payment.status === "pending" || payment.status === "scheduled")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const totalOverdue = vendorData
    .filter(payment => payment.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vendor Payment Reports</h1>
          <p className="text-muted-foreground">
            Track and manage vendor payments and invoices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Vendor
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
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
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPayable.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {vendorData.length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <PieChart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPaid.toLocaleString()}
            </div>
            <Progress 
              value={(totalPaid/totalPayable) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <PieChart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPending.toLocaleString()}
            </div>
            <Progress 
              value={(totalPending/totalPayable) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <PieChart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${totalOverdue.toLocaleString()}
            </div>
            <Progress 
              value={(totalOverdue/totalPayable) * 100} 
              className="mt-2 bg-red-100" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Vendor Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>List of all vendor payments and invoices</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={viewType === "all" ? "default" : "outline"} 
                      onClick={() => setViewType("all")}>
                All Payments
              </Button>
              <Button variant={viewType === "pending" ? "default" : "outline"}
                      onClick={() => setViewType("pending")}>
                Pending
              </Button>
              <Button variant={viewType === "paid" ? "default" : "outline"}
                      onClick={() => setViewType("paid")}>
                Paid
              </Button>
              <Button variant={viewType === "overdue" ? "default" : "outline"}
                      onClick={() => setViewType("overdue")}>
                Overdue
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Aging (Days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-medium">{payment.vendorName}</div>
                    <div className="text-xs text-muted-foreground">{payment.vendorId}</div>
                  </TableCell>
                  <TableCell>
                    <div>{payment.invoiceNumber}</div>
                    <div className="text-xs text-muted-foreground">
                      {payment.category}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      payment.status === "paid" ? "default" :
                      payment.status === "pending" ? "outline" :
                      payment.status === "scheduled" ? "secondary" :
                      "destructive"
                    }>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant={
                      payment.approvalStatus === "approved" ? "default" :
                      payment.approvalStatus === "pending" ? "outline" :
                      "destructive"
                    }>
                      {payment.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={payment.aging > 30 ? "text-red-500" : 
                                  payment.aging > 0 ? "text-yellow-500" : 
                                  "text-green-500"}>
                      {payment.aging}
                    </span>
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
