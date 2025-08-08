"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

// Types
type InventoryItem = {
  id: string
  name: string
  description: string
  category: string
  quantity: number
  unitPrice: number
  reorderLevel: number
  supplier: string
  location: string
  lastUpdated: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

type InventoryCategory = {
  id: string
  name: string
  description: string
}

// Default categories
const defaultCategories: InventoryCategory[] = [
  { id: "cat-1", name: "Electronics", description: "Electronic devices and components" },
  { id: "cat-2", name: "Office Supplies", description: "General office and administrative supplies" },
  { id: "cat-3", name: "Educational Materials", description: "Books, teaching aids, and learning materials" },
  { id: "cat-4", name: "Furniture", description: "Desks, chairs, and other furniture items" },
  { id: "cat-5", name: "Maintenance", description: "Cleaning and maintenance supplies" },
]

// Sample data
const sampleInventoryItems: InventoryItem[] = [
  {
    id: "IN-6001",
    name: "Textbooks - Calc 101",
    description: "Calculus textbooks for first-year students",
    category: "Educational Materials",
    quantity: 120,
    unitPrice: 85.00,
    reorderLevel: 20,
    supplier: "Academic Press Ltd",
    location: "Library Storage A",
    lastUpdated: new Date().toISOString(),
    status: "In Stock"
  },
  {
    id: "IN-6002",
    name: "Chromebooks",
    description: "Student laptops for computer lab",
    category: "Electronics",
    quantity: 45,
    unitPrice: 299.99,
    reorderLevel: 10,
    supplier: "Tech Solutions Inc",
    location: "IT Storage Room",
    lastUpdated: new Date().toISOString(),
    status: "In Stock"
  },
  {
    id: "IN-6003",
    name: "Projectors",
    description: "Classroom multimedia projectors",
    category: "Electronics",
    quantity: 5,
    unitPrice: 450.00,
    reorderLevel: 3,
    supplier: "AV Equipment Co",
    location: "AV Storage",
    lastUpdated: new Date().toISOString(),
    status: "Low Stock"
  },
]

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [categories] = useState<InventoryCategory[]>(defaultCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    unitPrice: "",
    reorderLevel: "",
    supplier: "",
    location: "",
  })

  useEffect(() => {
    setMounted(true)
    loadInventoryData()
  }, [])

  const loadInventoryData = () => {
    try {
      const savedItems = localStorage.getItem('inventory-items')
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      } else {
        setItems(sampleInventoryItems)
        localStorage.setItem('inventory-items', JSON.stringify(sampleInventoryItems))
      }
    } catch (error) {
      console.error('Error loading inventory data:', error)
      setItems(sampleInventoryItems)
    }
  }

  const saveInventoryData = (newItems: InventoryItem[]) => {
    try {
      localStorage.setItem('inventory-items', JSON.stringify(newItems))
      setItems(newItems)
    } catch (error) {
      console.error('Error saving inventory data:', error)
      toast({
        title: "Error",
        description: "Failed to save inventory data",
        variant: "destructive",
      })
    }
  }

  const generateId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `IN-${timestamp}-${random}`
  }

  const getItemStatus = (quantity: number, reorderLevel: number): "In Stock" | "Low Stock" | "Out of Stock" => {
    if (quantity === 0) return "Out of Stock"
    if (quantity <= reorderLevel) return "Low Stock"
    return "In Stock"
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      quantity: "",
      unitPrice: "",
      reorderLevel: "",
      supplier: "",
      location: "",
    })
  }

  const handleAddItem = () => {
    if (!formData.name || !formData.category || !formData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const quantity = parseInt(formData.quantity)
    const unitPrice = parseFloat(formData.unitPrice) || 0
    const reorderLevel = parseInt(formData.reorderLevel) || 0

    const newItem: InventoryItem = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      quantity,
      unitPrice,
      reorderLevel,
      supplier: formData.supplier,
      location: formData.location,
      lastUpdated: new Date().toISOString(),
      status: getItemStatus(quantity, reorderLevel)
    }

    const newItems = [...items, newItem]
    saveInventoryData(newItems)
    resetForm()
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: "Inventory item added successfully",
    })
  }

  const handleEditItem = () => {
    if (!editingItem || !formData.name || !formData.category || !formData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const quantity = parseInt(formData.quantity)
    const unitPrice = parseFloat(formData.unitPrice) || 0
    const reorderLevel = parseInt(formData.reorderLevel) || 0

    const updatedItem: InventoryItem = {
      ...editingItem,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      quantity,
      unitPrice,
      reorderLevel,
      supplier: formData.supplier,
      location: formData.location,
      lastUpdated: new Date().toISOString(),
      status: getItemStatus(quantity, reorderLevel)
    }

    const newItems = items.map(item =>
      item.id === editingItem.id ? updatedItem : item
    )
    saveInventoryData(newItems)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingItem(null)

    toast({
      title: "Success",
      description: "Inventory item updated successfully",
    })
  }

  const handleDeleteItem = (itemId: string) => {
    const newItems = items.filter(item => item.id !== itemId)
    saveInventoryData(newItems)

    toast({
      title: "Success",
      description: "Inventory item deleted successfully",
    })
  }

  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity.toString(),
      unitPrice: item.unitPrice.toString(),
      reorderLevel: item.reorderLevel.toString(),
      supplier: item.supplier,
      location: item.location,
    })
    setIsEditDialogOpen(true)
  }

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate summary statistics
  const totalItems = items.length
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const lowStockItems = items.filter(item => item.status === "Low Stock").length
  const outOfStockItems = items.filter(item => item.status === "Out of Stock").length

  const StatusBadge = ({ status }: { status: "In Stock" | "Low Stock" | "Out of Stock" }) => {
    if (status === "In Stock") {
      return <Badge className="bg-[#32872e] text-white hover:bg-[#256a24]">In Stock</Badge>
    }
    if (status === "Low Stock") {
      return <Badge className="bg-[#e0d722] text-black hover:bg-[#d5cc20]">Low Stock</Badge>
    }
    return <Badge className="bg-[#ef4444] text-white hover:bg-[#dc2626]">Out of Stock</Badge>
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="px-4 pb-8 pt-4 md:px-6"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-black">Inventory Management</h2>
          <p className="text-sm text-gray-600">Manage your inventory items and track stock levels</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#32872e] hover:bg-[#e0d722] hover:text-black text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter item description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter storage location"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} className="bg-[#32872e] hover:bg-[#256a24] text-white">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Active inventory items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need reordering
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items unavailable
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">ID</TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="min-w-[150px]">Category</TableHead>
                <TableHead className="min-w-[100px]">Quantity</TableHead>
                <TableHead className="min-w-[120px]">Unit Price</TableHead>
                <TableHead className="min-w-[120px]">Total Value</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Supplier</TableHead>
                <TableHead className="min-w-[120px]">Location</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    No inventory items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-[#f0f1f2]">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{item.quantity}</div>
                        {item.quantity <= item.reorderLevel && (
                          <div className="text-xs text-red-500">
                            Reorder at {item.reorderLevel}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell>{item.supplier || "—"}</TableCell>
                    <TableCell>{item.location || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Item Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter item description"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity *</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unitPrice">Unit Price</Label>
                <Input
                  id="edit-unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reorderLevel">Reorder Level</Label>
                <Input
                  id="edit-reorderLevel"
                  type="number"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-supplier">Supplier</Label>
                <Input
                  id="edit-supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter storage location"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem} className="bg-[#32872e] hover:bg-[#256a24] text-white">
              Update Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
