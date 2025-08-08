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
import { Search, QrCode, Printer, Download } from "lucide-react"

interface AssetTag {
  id: string
  assetId: string
  assetName: string
  tagNumber: string
  location: string
  department: string
  tagType: "qr" | "barcode" | "both"
  lastPrinted: string
  status: "active" | "replaced" | "damaged"
}

const tagData: AssetTag[] = [
  {
    id: "TAG001",
    assetId: "AST001",
    assetName: "Dell Latitude 5420",
    tagNumber: "IT-LAP-001",
    location: "Main Office",
    department: "IT Department",
    tagType: "both",
    lastPrinted: "2025-07-30",
    status: "active"
  },
  {
    id: "TAG002",
    assetId: "AST002",
    assetName: "Conference Room Table",
    tagNumber: "FUR-TAB-001",
    location: "Meeting Room 1",
    department: "Facilities",
    tagType: "qr",
    lastPrinted: "2025-07-30",
    status: "active"
  },
  {
    id: "TAG003",
    assetId: "AST003",
    assetName: "HVAC System",
    tagNumber: "EQP-HVAC-001",
    location: "Building A",
    department: "Facilities",
    tagType: "both",
    lastPrinted: "2025-06-15",
    status: "damaged"
  }
]

export default function TaggingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredTags = tagData.filter(tag =>
    tag.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tagData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tagData.filter(t => t.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tagData.filter(t => t.tagType === "qr" || t.tagType === "both").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barcodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tagData.filter(t => t.tagType === "barcode" || t.tagType === "both").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tag Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Asset Tags</CardTitle>
              <CardDescription>Generate and manage asset tags</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline" disabled={selectedTags.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export Tags
              </Button>
              <Button variant="outline" disabled={selectedTags.length === 0}>
                <Printer className="h-4 w-4 mr-2" />
                Print Selected
              </Button>
              <Button>
                <QrCode className="h-4 w-4 mr-2" />
                Generate New Tag
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Tag Number</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Tag Type</TableHead>
                <TableHead>Last Printed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <Input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => toggleTagSelection(tag.id)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell>{tag.tagNumber}</TableCell>
                  <TableCell>{tag.assetName}</TableCell>
                  <TableCell>{tag.location}</TableCell>
                  <TableCell>{tag.department}</TableCell>
                  <TableCell>
                    <Badge variant={
                      tag.tagType === "both" ? "default" :
                      tag.tagType === "qr" ? "secondary" : "outline"
                    }>
                      {tag.tagType}
                    </Badge>
                  </TableCell>
                  <TableCell>{tag.lastPrinted}</TableCell>
                  <TableCell>
                    <Badge variant={
                      tag.status === "active" ? "default" :
                      tag.status === "replaced" ? "secondary" : "destructive"
                    }>
                      {tag.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Print
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
