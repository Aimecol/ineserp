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
import { Download, Search, Filter, Calendar } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: "create" | "update" | "delete" | "view" | "export"
  module: string
  details: string
  ipAddress: string
  status: "success" | "warning" | "error"
  additionalInfo?: string
}

const auditData: AuditLog[] = [
  {
    id: "LOG001",
    timestamp: "2025-08-08T09:30:00",
    user: "john.smith@example.com",
    action: "update",
    module: "Payroll",
    details: "Modified salary information for employee ID: EMP123",
    ipAddress: "192.168.1.100",
    status: "success"
  },
  {
    id: "LOG002",
    timestamp: "2025-08-08T09:15:00",
    user: "sarah.johnson@example.com",
    action: "export",
    module: "Financial Reports",
    details: "Exported Q2 financial statements",
    ipAddress: "192.168.1.101",
    status: "success"
  },
  {
    id: "LOG003",
    timestamp: "2025-08-08T09:00:00",
    user: "admin@example.com",
    action: "delete",
    module: "Vendors",
    details: "Removed inactive vendor: VEN456",
    ipAddress: "192.168.1.1",
    status: "warning",
    additionalInfo: "Requires review"
  },
  {
    id: "LOG004",
    timestamp: "2025-08-08T08:45:00",
    user: "system",
    action: "create",
    module: "Invoicing",
    details: "Auto-generated monthly invoices",
    ipAddress: "localhost",
    status: "success"
  },
  {
    id: "LOG005",
    timestamp: "2025-08-08T08:30:00",
    user: "michael.brown@example.com",
    action: "update",
    module: "Budget",
    details: "Updated department budget allocation",
    ipAddress: "192.168.1.102",
    status: "error",
    additionalInfo: "Validation failed - Insufficient permissions"
  }
]

export default function AuditLogsPage() {
  const [filterType, setFilterType] = useState<"all" | "success" | "warning" | "error">("all")

  // Count logs by status
  const successCount = auditData.filter(log => log.status === "success").length
  const warningCount = auditData.filter(log => log.status === "warning").length
  const errorCount = auditData.filter(log => log.status === "error").length

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Audit Trail Logs</h1>
          <p className="text-muted-foreground">
            Track and monitor system activities and changes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Logs
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
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Badge>{auditData.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Last 24 Hours
            </div>
            <p className="text-xs text-muted-foreground">
              From multiple users and systems
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <Badge variant="default">{successCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {((successCount/auditData.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Of total activities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <Badge variant="secondary">{warningCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {((warningCount/auditData.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <Badge variant="destructive">{errorCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {((errorCount/auditData.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Need investigation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Detailed audit trail of system activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={filterType === "all" ? "default" : "outline"} 
                      onClick={() => setFilterType("all")}>
                All Logs
              </Button>
              <Button variant={filterType === "success" ? "default" : "outline"}
                      onClick={() => setFilterType("success")}>
                Success
              </Button>
              <Button variant={filterType === "warning" ? "default" : "outline"}
                      onClick={() => setFilterType("warning")}>
                Warnings
              </Button>
              <Button variant={filterType === "error" ? "default" : "outline"}
                      onClick={() => setFilterType("error")}>
                Errors
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="font-medium">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>
                    <div>{log.details}</div>
                    {log.additionalInfo && (
                      <div className="text-xs text-muted-foreground">
                        {log.additionalInfo}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <code className="text-xs">{log.ipAddress}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      log.status === "success" ? "default" :
                      log.status === "warning" ? "secondary" :
                      "destructive"
                    }>
                      {log.status}
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
