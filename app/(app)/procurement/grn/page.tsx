"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, FileText } from "lucide-react"

interface GRNItem {
  id: string
  poNumber: string
  supplier: string
  deliveryDate: string
  items: {
    name: string
    ordered: number
    received: number
    condition: "good" | "damaged" | "pending"
  }[]
  status: "complete" | "partial" | "pending"
  notes?: string
}

const grnData: GRNItem[] = [
  {
    id: "GRN-2025-001",
    poNumber: "PO-2025-001",
    supplier: "TechSupplies Ltd",
    deliveryDate: "2025-08-08",
    items: [
      { name: "Laptops", ordered: 10, received: 10, condition: "good" },
      { name: "Monitors", ordered: 10, received: 8, condition: "good" }
    ],
    status: "partial",
    notes: "2 monitors pending delivery"
  },
  {
    id: "GRN-2025-002",
    poNumber: "PO-2025-002",
    supplier: "Office Solutions Co",
    deliveryDate: "2025-08-07",
    items: [
      { name: "Office Chairs", ordered: 20, received: 20, condition: "good" },
      { name: "Desks", ordered: 15, received: 15, condition: "good" }
    ],
    status: "complete"
  },
  {
    id: "GRN-2025-003",
    poNumber: "PO-2025-003",
    supplier: "IT Systems Inc",
    deliveryDate: "2025-08-06",
    items: [
      { name: "Network Switches", ordered: 5, received: 4, condition: "good" },
      { name: "Servers", ordered: 2, received: 2, condition: "damaged" }
    ],
    status: "partial",
    notes: "Servers received with visible damage, 1 switch pending"
  }
]

export default function GRNPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGRN = grnData.filter(grn =>
    grn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grn.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grn.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grnData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grnData.filter(g => g.status === "complete").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grnData.filter(g => g.status === "partial").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grnData.filter(g => g.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GRN List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Goods Received Notes</CardTitle>
              <CardDescription>Track and manage deliveries</CardDescription>
            </div>
            <Button>Create GRN</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search GRN or PO number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredGRN.map((grn) => (
              <Card key={grn.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{grn.id}</CardTitle>
                        <Badge variant={
                          grn.status === "complete" ? "default" :
                          grn.status === "partial" ? "secondary" : "outline"
                        }>
                          {grn.status}
                        </Badge>
                      </div>
                      <CardDescription>PO: {grn.poNumber} | Supplier: {grn.supplier}</CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Delivery Date: {grn.deliveryDate}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Ordered</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Condition</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grn.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.ordered}</TableCell>
                          <TableCell>{item.received}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.condition === "good" ? "default" :
                              item.condition === "damaged" ? "destructive" : "secondary"
                            }>
                              {item.condition}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {grn.notes && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold">Notes:</span> {grn.notes}
                    </div>
                  )}
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Details
                    </Button>
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
