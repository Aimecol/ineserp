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
import { Input } from "@/components/ui/input"
import { Search, Calculator, Download } from "lucide-react"

interface DepreciationEntry {
  id: string
  assetId: string
  assetName: string
  purchaseDate: string
  cost: number
  usefulLife: number
  salvageValue: number
  method: "straight-line" | "declining-balance" | "sum-of-years"
  currentValue: number
  yearlyDepreciation: number
  accumulatedDepreciation: number
}

const depreciationData: DepreciationEntry[] = [
  {
    id: "DEP001",
    assetId: "AST001",
    assetName: "Dell Latitude 5420",
    purchaseDate: "2025-01-15",
    cost: 1200.00,
    usefulLife: 3,
    salvageValue: 200.00,
    method: "straight-line",
    currentValue: 1000.00,
    yearlyDepreciation: 333.33,
    accumulatedDepreciation: 200.00
  },
  {
    id: "DEP002",
    assetId: "AST002",
    assetName: "Conference Room Table",
    purchaseDate: "2024-11-20",
    cost: 800.00,
    usefulLife: 5,
    salvageValue: 100.00,
    method: "straight-line",
    currentValue: 740.00,
    yearlyDepreciation: 140.00,
    accumulatedDepreciation: 60.00
  },
  {
    id: "DEP003",
    assetId: "AST003",
    assetName: "HVAC System",
    purchaseDate: "2023-06-10",
    cost: 15000.00,
    usefulLife: 10,
    salvageValue: 1500.00,
    method: "declining-balance",
    currentValue: 12000.00,
    yearlyDepreciation: 1350.00,
    accumulatedDepreciation: 3000.00
  }
]

export default function DepreciationPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEntries = depreciationData.filter(entry =>
    entry.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.assetId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalDepreciation = depreciationData.reduce((sum, entry) => sum + entry.accumulatedDepreciation, 0)
  const totalAssetValue = depreciationData.reduce((sum, entry) => sum + entry.currentValue, 0)

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{depreciationData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAssetValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalDepreciation.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${depreciationData.reduce((sum, entry) => sum + entry.yearlyDepreciation, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Depreciation List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Asset Depreciation</CardTitle>
              <CardDescription>Track asset depreciation and value</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Depreciation
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Initial Cost</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Yearly Depreciation</TableHead>
                <TableHead>Accumulated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.assetId}</TableCell>
                  <TableCell>{entry.assetName}</TableCell>
                  <TableCell>{entry.purchaseDate}</TableCell>
                  <TableCell>${entry.cost.toLocaleString()}</TableCell>
                  <TableCell>${entry.currentValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      entry.method === "straight-line" ? "default" :
                      entry.method === "declining-balance" ? "secondary" : "outline"
                    }>
                      {entry.method}
                    </Badge>
                  </TableCell>
                  <TableCell>${entry.yearlyDepreciation.toLocaleString()}</TableCell>
                  <TableCell>${entry.accumulatedDepreciation.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Schedule</Button>
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
