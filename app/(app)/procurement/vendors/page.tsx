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
import { Search, Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Vendor {
  id: string
  name: string
  category: string
  contactPerson: string
  email: string
  phone: string
  status: "active" | "inactive"
  rating: number
  totalOrders: number
  lastOrder: string
}

const vendors: Vendor[] = [
  {
    id: "V001",
    name: "TechSupplies Ltd",
    category: "IT Equipment",
    contactPerson: "John Smith",
    email: "john@techsupplies.com",
    phone: "+1234567890",
    status: "active",
    rating: 4.5,
    totalOrders: 25,
    lastOrder: "2025-07-28"
  },
  {
    id: "V002",
    name: "Office Solutions Co",
    category: "Office Supplies",
    contactPerson: "Sarah Johnson",
    email: "sarah@officesolutions.com",
    phone: "+1234567891",
    status: "active",
    rating: 4.8,
    totalOrders: 42,
    lastOrder: "2025-08-05"
  },
  {
    id: "V003",
    name: "Global Furniture Inc",
    category: "Furniture",
    contactPerson: "Mike Wilson",
    email: "mike@globalfurniture.com",
    phone: "+1234567892",
    status: "inactive",
    rating: 3.9,
    totalOrders: 15,
    lastOrder: "2025-06-15"
  }
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const filteredVendors = vendors.filter(vendor =>
    (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === "" || vendor.category === categoryFilter)
  )

  const categories = Array.from(new Set(vendors.map(v => v.category)))

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(v => v.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {(vendors.reduce((acc, v) => acc + v.rating, 0) / vendors.length).toFixed(1)}
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.reduce((acc, v) => acc + v.totalOrders, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Vendor Management</CardTitle>
              <CardDescription>Manage and track vendor information</CardDescription>
            </div>
            <Button>Add Vendor</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>{vendor.contactPerson}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{vendor.email}</div>
                      <div className="text-gray-500">{vendor.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {vendor.rating}
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={vendor.status === "active" ? "default" : "secondary"}
                    >
                      {vendor.status}
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
