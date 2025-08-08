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
import { Search, Plus, QrCode, FileText } from "lucide-react"

interface Asset {
  id: string
  name: string
  category: string
  location: string
  purchaseDate: string
  cost: number
  condition: "excellent" | "good" | "fair" | "poor"
  status: "active" | "maintenance" | "disposed"
  lastAudit: string
  tagNumber: string
}

const assetData: Asset[] = [
  {
    id: "AST001",
    name: "Dell Latitude 5420",
    category: "IT Equipment",
    location: "Main Office",
    purchaseDate: "2025-01-15",
    cost: 1200.00,
    condition: "excellent",
    status: "active",
    lastAudit: "2025-07-30",
    tagNumber: "IT-LAP-001"
  },
  {
    id: "AST002",
    name: "Conference Room Table",
    category: "Furniture",
    location: "Meeting Room 1",
    purchaseDate: "2024-11-20",
    cost: 800.00,
    condition: "good",
    status: "active",
    lastAudit: "2025-07-30",
    tagNumber: "FUR-TAB-001"
  },
  {
    id: "AST003",
    name: "HVAC System",
    category: "Equipment",
    location: "Building A",
    purchaseDate: "2023-06-10",
    cost: 15000.00,
    condition: "fair",
    status: "maintenance",
    lastAudit: "2025-07-30",
    tagNumber: "EQP-HVAC-001"
  }
]

export default function AssetRegistryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAssets = assetData.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = assetData.reduce((sum, asset) => sum + asset.cost, 0)

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assetData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assetData.filter(a => a.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assetData.filter(a => a.status === "maintenance").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Asset Registry</CardTitle>
              <CardDescription>Manage and track fixed assets</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                Generate Tags
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
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
                <TableHead>Tag Number</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.tagNumber}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell>${asset.cost.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      asset.condition === "excellent" ? "default" :
                      asset.condition === "good" ? "secondary" :
                      asset.condition === "fair" ? "outline" : "destructive"
                    }>
                      {asset.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      asset.status === "active" ? "default" :
                      asset.status === "maintenance" ? "secondary" : "destructive"
                    }>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Details
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
