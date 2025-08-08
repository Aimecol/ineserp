"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Employee = {
  id: string
  name: string
  position: string
  department: string
  joinDate: string
  contractType: string
  salary: string
}

const employeeData: Employee[] = [
  { id: "EMP001", name: "John Doe", position: "Senior Developer", department: "IT", joinDate: "2024-01-15", contractType: "Permanent", salary: "$5,000" },
  { id: "EMP002", name: "Jane Smith", position: "HR Manager", department: "Human Resources", joinDate: "2023-08-01", contractType: "Permanent", salary: "$4,500" },
  { id: "EMP003", name: "Mike Johnson", position: "Account Executive", department: "Sales", joinDate: "2024-03-01", contractType: "Contract", salary: "$3,800" },
  { id: "EMP004", name: "Sarah Williams", position: "Financial Analyst", department: "Finance", joinDate: "2024-02-15", contractType: "Permanent", salary: "$4,200" },
]

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Employee Information</CardTitle>
          <Button>Add Employee</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Contract Type</TableHead>
                  <TableHead>Basic Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.joinDate}</TableCell>
                    <TableCell>{employee.contractType}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
