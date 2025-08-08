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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calculator } from "lucide-react"

interface ScheduleEntry {
  year: number
  beginningValue: number
  depreciation: number
  endingValue: number
  accumulatedDepreciation: number
  status: "current" | "future" | "past"
}

interface AssetSchedule {
  id: string
  assetId: string
  assetName: string
  purchaseDate: string
  cost: number
  salvageValue: number
  usefulLife: number
  method: "straight-line" | "declining-balance" | "sum-of-years"
  schedule: ScheduleEntry[]
}

const scheduleData: AssetSchedule[] = [
  {
    id: "SCH001",
    assetId: "AST001",
    assetName: "Dell Latitude 5420",
    purchaseDate: "2025-01-15",
    cost: 1200.00,
    salvageValue: 200.00,
    usefulLife: 3,
    method: "straight-line",
    schedule: [
      {
        year: 2025,
        beginningValue: 1200.00,
        depreciation: 333.33,
        endingValue: 866.67,
        accumulatedDepreciation: 333.33,
        status: "current"
      },
      {
        year: 2026,
        beginningValue: 866.67,
        depreciation: 333.33,
        endingValue: 533.34,
        accumulatedDepreciation: 666.66,
        status: "future"
      },
      {
        year: 2027,
        beginningValue: 533.34,
        depreciation: 333.34,
        endingValue: 200.00,
        accumulatedDepreciation: 1000.00,
        status: "future"
      }
    ]
  },
  {
    id: "SCH002",
    assetId: "AST003",
    assetName: "HVAC System",
    purchaseDate: "2023-06-10",
    cost: 15000.00,
    salvageValue: 1500.00,
    usefulLife: 10,
    method: "declining-balance",
    schedule: [
      {
        year: 2023,
        beginningValue: 15000.00,
        depreciation: 1350.00,
        endingValue: 13650.00,
        accumulatedDepreciation: 1350.00,
        status: "past"
      },
      {
        year: 2024,
        beginningValue: 13650.00,
        depreciation: 1350.00,
        endingValue: 12300.00,
        accumulatedDepreciation: 2700.00,
        status: "past"
      },
      {
        year: 2025,
        beginningValue: 12300.00,
        depreciation: 1350.00,
        endingValue: 10950.00,
        accumulatedDepreciation: 4050.00,
        status: "current"
      }
    ]
  }
]

export default function DepreciationSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const filteredSchedules = scheduleData.filter(schedule =>
    schedule.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.assetId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedSchedule = selectedAsset 
    ? scheduleData.find(s => s.id === selectedAsset)
    : filteredSchedules[0]

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduleData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Year Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${scheduleData.reduce((sum, asset) => {
                const currentYear = asset.schedule.find(s => s.status === "current")
                return sum + (currentYear?.depreciation || 0)
              }, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Book Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${scheduleData.reduce((sum, asset) => {
                const currentYear = asset.schedule.find(s => s.status === "current")
                return sum + (currentYear?.endingValue || 0)
              }, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accumulated Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${scheduleData.reduce((sum, asset) => {
                const currentYear = asset.schedule.find(s => s.status === "current")
                return sum + (currentYear?.accumulatedDepreciation || 0)
              }, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule View */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Depreciation Schedule</CardTitle>
              <CardDescription>View detailed depreciation schedules by asset</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Schedule
              </Button>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Recalculate
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

          {selectedSchedule && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Asset</p>
                    <p className="font-medium">{selectedSchedule.assetName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">{selectedSchedule.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="font-medium">${selectedSchedule.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Method</p>
                    <Badge>{selectedSchedule.method}</Badge>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Beginning Value</TableHead>
                    <TableHead>Depreciation</TableHead>
                    <TableHead>Ending Value</TableHead>
                    <TableHead>Accumulated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSchedule.schedule.map((entry) => (
                    <TableRow key={entry.year} className={entry.status === "current" ? "bg-muted/50" : ""}>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>${entry.beginningValue.toLocaleString()}</TableCell>
                      <TableCell>${entry.depreciation.toLocaleString()}</TableCell>
                      <TableCell>${entry.endingValue.toLocaleString()}</TableCell>
                      <TableCell>${entry.accumulatedDepreciation.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
