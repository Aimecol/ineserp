"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { FileDown, Printer } from "lucide-react"

export default function PayslipsPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")

  const payslipData = {
    employeeName: "John Doe",
    employeeId: "EMP001",
    department: "IT",
    position: "Senior Developer",
    month: "July 2025",
    earnings: [
      { description: "Basic Salary", amount: 5000.00 },
      { description: "Housing Allowance", amount: 500.00 },
      { description: "Transport Allowance", amount: 300.00 },
      { description: "Performance Bonus", amount: 1000.00 },
    ],
    deductions: [
      { description: "PAYE Tax", amount: 850.00 },
      { description: "RSSB Pension", amount: 300.00 },
      { description: "Health Insurance", amount: 150.00 },
    ],
  }

  const totalEarnings = payslipData.earnings.reduce((sum, item) => sum + item.amount, 0)
  const totalDeductions = payslipData.deductions.reduce((sum, item) => sum + item.amount, 0)
  const netPay = totalEarnings - totalDeductions

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payslip Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp001">John Doe - EMP001</SelectItem>
                  <SelectItem value="emp002">Jane Smith - EMP002</SelectItem>
                  <SelectItem value="emp003">Mike Johnson - EMP003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jul2025">July 2025</SelectItem>
                  <SelectItem value="jun2025">June 2025</SelectItem>
                  <SelectItem value="may2025">May 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center gap-2">
              Generate Payslip
            </Button>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center border-b">
              <h2 className="text-2xl font-bold">PAYSLIP</h2>
              <p className="text-gray-500">{payslipData.month}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p><strong>Employee Name:</strong> {payslipData.employeeName}</p>
                  <p><strong>Employee ID:</strong> {payslipData.employeeId}</p>
                </div>
                <div>
                  <p><strong>Department:</strong> {payslipData.department}</p>
                  <p><strong>Position:</strong> {payslipData.position}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Earnings</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payslipData.earnings.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total Earnings</TableCell>
                        <TableCell className="text-right font-bold">${totalEarnings.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Deductions</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payslipData.deductions.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total Deductions</TableCell>
                        <TableCell className="text-right font-bold">${totalDeductions.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Net Pay:</span>
                    <span className="text-lg font-bold">${netPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
