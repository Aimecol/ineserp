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
import { Label } from "@/components/ui/label"
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Plus, Save, Filter, Table as TableIcon } from "lucide-react"

interface ReportField {
  id: string
  name: string
  category: string
  type: "number" | "text" | "date" | "boolean"
  description: string
}

interface SavedReport {
  id: string
  name: string
  description: string
  selectedFields: string[]
  filters: {
    field: string
    operator: string
    value: string
  }[]
  lastRun: string
  creator: string
}

const availableFields: ReportField[] = [
  {
    id: "f1",
    name: "Transaction Date",
    category: "General",
    type: "date",
    description: "Date of the financial transaction"
  },
  {
    id: "f2",
    name: "Account Number",
    category: "Chart of Accounts",
    type: "text",
    description: "GL account number"
  },
  {
    id: "f3",
    name: "Account Name",
    category: "Chart of Accounts",
    type: "text",
    description: "GL account name"
  },
  {
    id: "f4",
    name: "Transaction Amount",
    category: "General",
    type: "number",
    description: "Amount of the transaction"
  },
  {
    id: "f5",
    name: "Transaction Type",
    category: "General",
    type: "text",
    description: "Credit or Debit"
  },
  {
    id: "f6",
    name: "Department",
    category: "Organization",
    type: "text",
    description: "Department code"
  },
  {
    id: "f7",
    name: "Project Code",
    category: "Projects",
    type: "text",
    description: "Associated project code"
  },
  {
    id: "f8",
    name: "Is Reconciled",
    category: "Reconciliation",
    type: "boolean",
    description: "Reconciliation status"
  }
]

const savedReports: SavedReport[] = [
  {
    id: "r1",
    name: "Monthly Department Expenses",
    description: "Summary of expenses by department",
    selectedFields: ["f1", "f4", "f6"],
    filters: [
      {
        field: "f5",
        operator: "equals",
        value: "Debit"
      }
    ],
    lastRun: "2025-08-07",
    creator: "John Doe"
  },
  {
    id: "r2",
    name: "Project Revenue Analysis",
    description: "Revenue breakdown by project",
    selectedFields: ["f1", "f4", "f7"],
    filters: [
      {
        field: "f5",
        operator: "equals",
        value: "Credit"
      }
    ],
    lastRun: "2025-08-06",
    creator: "Jane Smith"
  }
]

export default function CustomReportBuilder() {
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(current =>
      current.includes(fieldId)
        ? current.filter(id => id !== fieldId)
        : [...current, fieldId]
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Custom Report Builder</h1>
          <p className="text-muted-foreground">
            Build and save custom financial reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TableIcon className="h-4 w-4 mr-2" />
            Load Template
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Report Configuration */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Define your custom report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                placeholder="Enter report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportDescription">Description</Label>
              <Input
                id="reportDescription"
                placeholder="Enter report description"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="comparative">Comparative Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Field Selection */}
        <Card className="md:col-span-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Available Fields</CardTitle>
                <CardDescription>Select fields to include in your report</CardDescription>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Add Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableFields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedFields.includes(field.id)}
                        onCheckedChange={() => handleFieldToggle(field.id)}
                      />
                    </TableCell>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{field.category}</Badge>
                    </TableCell>
                    <TableCell>{field.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{field.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Your custom report templates</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{new Date(report.lastRun).toLocaleDateString()}</TableCell>
                  <TableCell>{report.creator}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
