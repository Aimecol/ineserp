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
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function LeavePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  const leaveData = [
    { 
      employeeId: "EMP001",
      name: "John Doe",
      leaveType: "Annual Leave",
      startDate: "2025-08-15",
      endDate: "2025-08-22",
      days: 8,
      status: "Approved"
    },
    {
      employeeId: "EMP002",
      name: "Jane Smith",
      leaveType: "Sick Leave",
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      days: 3,
      status: "Pending"
    },
    {
      employeeId: "EMP003",
      name: "Mike Johnson",
      leaveType: "Maternity Leave",
      startDate: "2025-09-01",
      endDate: "2025-11-30",
      days: 90,
      status: "Approved"
    }
  ]

  const leaveBalances = [
    { type: "Annual Leave", total: 30, used: 15, remaining: 15 },
    { type: "Sick Leave", total: 14, used: 3, remaining: 11 },
    { type: "Maternity Leave", total: 90, used: 0, remaining: 90 },
    { type: "Paternity Leave", total: 14, used: 0, remaining: 14 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Leave Calendar</CardTitle>
            <CardDescription>View and manage employee leaves</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Balances</CardTitle>
            <CardDescription>Current leave entitlements and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead>Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveBalances.map((balance) => (
                  <TableRow key={balance.type}>
                    <TableCell>{balance.type}</TableCell>
                    <TableCell>{balance.total}</TableCell>
                    <TableCell>{balance.used}</TableCell>
                    <TableCell>
                      <Badge variant={balance.remaining > 5 ? "default" : "destructive"}>
                        {balance.remaining}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Manage employee leave requests</CardDescription>
            </div>
            <Button>New Leave Request</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveData.map((leave) => (
                <TableRow key={`${leave.employeeId}-${leave.startDate}`}>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{format(new Date(leave.startDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{format(new Date(leave.endDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        leave.status === "Approved" ? "default" :
                        leave.status === "Pending" ? "secondary" : "destructive"
                      }
                    >
                      {leave.status}
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
