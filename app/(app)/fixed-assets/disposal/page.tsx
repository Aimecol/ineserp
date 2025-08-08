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
import { Search, FileText, Trash2, AlertCircle } from "lucide-react"

interface DisposalRecord {
  id: string
  assetId: string
  assetName: string
  disposalDate: string
  bookValue: number
  disposalValue: number
  gainLoss: number
  method: "sale" | "scrapped" | "donated"
  reason: string
  status: "pending" | "approved" | "completed"
  approvedBy?: string
  documents: string[]
}

const disposalData: DisposalRecord[] = [
  {
    id: "DSP001",
    assetId: "AST004",
    assetName: "Old Office Printer",
    disposalDate: "2025-08-15",
    bookValue: 200.00,
    disposalValue: 150.00,
    gainLoss: -50.00,
    method: "sale",
    reason: "Obsolete technology, high maintenance cost",
    status: "pending",
    documents: ["disposal_request.pdf", "valuation.pdf"]
  },
  {
    id: "DSP002",
    assetId: "AST005",
    assetName: "Broken Furniture",
    disposalDate: "2025-08-01",
    bookValue: 100.00,
    disposalValue: 0.00,
    gainLoss: -100.00,
    method: "scrapped",
    reason: "Beyond repair, safety hazard",
    status: "completed",
    approvedBy: "John Manager",
    documents: ["disposal_approval.pdf", "inspection_report.pdf"]
  },
  {
    id: "DSP003",
    assetId: "AST006",
    assetName: "Old Laptops (5 units)",
    disposalDate: "2025-08-10",
    bookValue: 1000.00,
    disposalValue: 0.00,
    gainLoss: -1000.00,
    method: "donated",
    reason: "Donation to local school",
    status: "approved",
    approvedBy: "Jane Director",
    documents: ["donation_letter.pdf", "asset_transfer.pdf"]
  }
]

export default function DisposalPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDisposals = disposalData.filter(disposal =>
    disposal.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disposal.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disposal.method.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalLoss = disposalData.reduce((sum, disposal) => sum + disposal.gainLoss, 0)

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disposalData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disposalData.filter(d => d.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Net Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              ${Math.abs(totalLoss).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disposalData.filter(d => d.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disposal List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Asset Disposal Records</CardTitle>
              <CardDescription>Track and manage asset disposals</CardDescription>
            </div>
            <Button>
              <Trash2 className="h-4 w-4 mr-2" />
              New Disposal Request
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search disposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDisposals.map((disposal) => (
              <Card key={disposal.id} className="relative overflow-hidden">
                {disposal.status === "pending" && (
                  <div className="absolute top-0 right-0 p-2">
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Pending Approval
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{disposal.assetName}</CardTitle>
                      <CardDescription>
                        ID: {disposal.id} | Asset: {disposal.assetId}
                      </CardDescription>
                    </div>
                    <Badge variant={
                      disposal.method === "sale" ? "default" :
                      disposal.method === "donated" ? "secondary" : "outline"
                    }>
                      {disposal.method}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Book Value</p>
                      <p className="font-medium">${disposal.bookValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Disposal Value</p>
                      <p className="font-medium">${disposal.disposalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gain/Loss</p>
                      <p className={`font-medium ${disposal.gainLoss < 0 ? "text-destructive" : "text-green-600"}`}>
                        ${disposal.gainLoss.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-2">Reason for Disposal:</p>
                    <p>{disposal.reason}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      {disposal.documents.map((doc, index) => (
                        <Button key={index} variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {disposal.approvedBy && (
                        <span className="text-sm text-muted-foreground">
                          Approved by: {disposal.approvedBy}
                        </span>
                      )}
                      <Badge variant={
                        disposal.status === "completed" ? "default" :
                        disposal.status === "approved" ? "secondary" : "outline"
                      }>
                        {disposal.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
