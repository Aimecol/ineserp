"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronRight } from "lucide-react"

type WorkflowStatus = "Request" | "LPO" | "Delivery" | "Invoice" | "Completed"

interface WorkflowItem {
  id: string
  title: string
  requestDate: string
  vendor: string
  amount: string
  currentStage: WorkflowStatus
  status: "pending" | "approved" | "rejected"
}

const workflowItems: WorkflowItem[] = [
  {
    id: "PO-2025-001",
    title: "Office Equipment",
    requestDate: "2025-08-01",
    vendor: "TechSupplies Ltd",
    amount: "$12,500.00",
    currentStage: "LPO",
    status: "approved"
  },
  {
    id: "PO-2025-002",
    title: "IT Infrastructure",
    requestDate: "2025-08-05",
    vendor: "NetworkPro Systems",
    amount: "$45,000.00",
    currentStage: "Request",
    status: "pending"
  },
  {
    id: "PO-2025-003",
    title: "Office Supplies",
    requestDate: "2025-07-28",
    vendor: "General Supplies Co",
    amount: "$3,200.00",
    currentStage: "Delivery",
    status: "approved"
  },
  {
    id: "PO-2025-004",
    title: "Software Licenses",
    requestDate: "2025-07-25",
    vendor: "SoftwarePro Inc",
    amount: "$18,000.00",
    currentStage: "Invoice",
    status: "approved"
  }
]

const stages: WorkflowStatus[] = ["Request", "LPO", "Delivery", "Invoice", "Completed"]

export default function WorkflowPage() {
  return (
    <div className="space-y-4">
      {/* Stage Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage, index) => (
          <Card key={stage}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stage}</CardTitle>
              <Badge variant="outline">{workflowItems.filter(item => item.currentStage === stage).length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {index < stages.length - 1 && <ChevronRight className="text-muted-foreground" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Procurement Workflow</CardTitle>
          <CardDescription>Track procurement requests through various stages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflowItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.currentStage}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "approved" ? "default" :
                        item.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
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
