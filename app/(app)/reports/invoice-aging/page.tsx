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
import { Download, Calendar, PieChart, Filter, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Invoice {
  id: string
  invoiceNumber: string
  vendor: string
  vendorId: string
  amount: number
  issueDate: string
  dueDate: string
  category: string
  status: "paid" | "pending" | "overdue"
  paymentTerms: string
  agingDays: number
  lastReminder?: string
  description: string
}

const invoiceData: Invoice[] = [
  {
    id: "INV001",
    invoiceNumber: "INV2025001",
    vendor: "Tech Solutions Inc.",
    vendorId: "VEN001",
    amount: 25000.00,
    issueDate: "2025-07-01",
    dueDate: "2025-07-31",
    category: "IT Services",
    status: "overdue",
    paymentTerms: "Net 30",
    agingDays: 38,
    lastReminder: "2025-08-05",
    description: "Software License Renewal"
  },
  {
    id: "INV002",
    invoiceNumber: "INV2025002",
    vendor: "Office Supplies Co.",
    vendorId: "VEN002",
    amount: 5000.00,
    issueDate: "2025-07-15",
    dueDate: "2025-08-14",
    category: "Supplies",
    status: "pending",
    paymentTerms: "Net 30",
    agingDays: 24,
    description: "Office Supplies Q3"
  },
  {
    id: "INV003",
    invoiceNumber: "INV2025003",
    vendor: "Building Maintenance Ltd.",
    vendorId: "VEN003",
    amount: 15000.00,
    issueDate: "2025-06-01",
    dueDate: "2025-07-01",
    category: "Maintenance",
    status: "overdue",
    paymentTerms: "Net 30",
    agingDays: 68,
    lastReminder: "2025-08-01",
    description: "Campus Maintenance Services"
  },
  {
    id: "INV004",
    invoiceNumber: "INV2025004",
    vendor: "Educational Resources Corp",
    vendorId: "VEN004",
    amount: 35000.00,
    issueDate: "2025-08-01",
    dueDate: "2025-08-31",
    category: "Educational Materials",
    status: "pending",
    paymentTerms: "Net 30",
    agingDays: 7,
    description: "Textbooks and Learning Materials"
  },
  {
    id: "INV005",
    invoiceNumber: "INV2025005",
    vendor: "Laboratory Supplies Inc.",
    vendorId: "VEN005",
    amount: 12000.00,
    issueDate: "2025-06-15",
    dueDate: "2025-07-15",
    category: "Lab Supplies",
    status: "overdue",
    paymentTerms: "Net 30",
    agingDays: 54,
    lastReminder: "2025-08-03",
    description: "Laboratory Equipment and Supplies"
  }
]

export default function InvoiceAgingPage() {
  const [viewType, setViewType] = useState<"all" | "current" | "overdue">("all")
  
  // Calculate aging buckets
  const current = invoiceData.filter(inv => inv.agingDays <= 30)
  const days31to60 = invoiceData.filter(inv => inv.agingDays > 30 && inv.agingDays <= 60)
  const days61to90 = invoiceData.filter(inv => inv.agingDays > 60 && inv.agingDays <= 90)
  const over90 = invoiceData.filter(inv => inv.agingDays > 90)

  const totalAmount = invoiceData.reduce((sum, inv) => sum + inv.amount, 0)
  const currentAmount = current.reduce((sum, inv) => sum + inv.amount, 0)
  const days31to60Amount = days31to60.reduce((sum, inv) => sum + inv.amount, 0)
  const days61to90Amount = days61to90.reduce((sum, inv) => sum + inv.amount, 0)
  const over90Amount = over90.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Invoice Aging Report</h1>
          <p className="text-muted-foreground">
            Track and analyze outstanding invoices by aging period
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Invoice
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoiceData.length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current (0-30)</CardTitle>
            <PieChart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${currentAmount.toLocaleString()}
            </div>
            <Progress 
              value={(currentAmount/totalAmount) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">31-60 Days</CardTitle>
            <PieChart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${days31to60Amount.toLocaleString()}
            </div>
            <Progress 
              value={(days31to60Amount/totalAmount) * 100} 
              className="mt-2 bg-yellow-100" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">61-90 Days</CardTitle>
            <PieChart className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${days61to90Amount.toLocaleString()}
            </div>
            <Progress 
              value={(days61to90Amount/totalAmount) * 100} 
              className="mt-2 bg-orange-100" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Over 90 Days</CardTitle>
            <PieChart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${over90Amount.toLocaleString()}
            </div>
            <Progress 
              value={(over90Amount/totalAmount) * 100} 
              className="mt-2 bg-red-100" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Detailed view of all outstanding invoices</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={viewType === "all" ? "default" : "outline"} 
                      onClick={() => setViewType("all")}>
                All Invoices
              </Button>
              <Button variant={viewType === "current" ? "default" : "outline"}
                      onClick={() => setViewType("current")}>
                Current
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
                <TableHead>Invoice</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aging (Days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="font-medium">{invoice.invoiceNumber}</div>
                    <div className="text-xs text-muted-foreground">{invoice.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>{invoice.vendor}</div>
                    <div className="text-xs text-muted-foreground">{invoice.category}</div>
                  </TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.status === "paid" ? "default" :
                      invoice.status === "pending" ? "outline" :
                      "destructive"
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.agingDays <= 30 ? "default" :
                      invoice.agingDays <= 60 ? "outline" :
                      invoice.agingDays <= 90 ? "secondary" :
                      "destructive"
                    }>
                      {invoice.agingDays} days
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
