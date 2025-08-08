"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  CalendarIcon, 
  Plus, 
  Trash2, 
  ShoppingCart,
  Building,
  FileText,
  Calculator,
  Package,
  Truck
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ProcurementFormProps {
  open: boolean
  onClose: () => void
}

interface ProcurementItem {
  id: string
  description: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specifications?: string
}

interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  address: string
  rating: number
}

export function ProcurementForm({ open, onClose }: ProcurementFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [orderDate, setOrderDate] = useState<Date>()
  const [requiredDate, setRequiredDate] = useState<Date>()
  const [department, setDepartment] = useState("")
  const [priority, setPriority] = useState("")
  const [vendor, setVendor] = useState("")
  const [description, setDescription] = useState("")
  const [justification, setJustification] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [items, setItems] = useState<ProcurementItem[]>([])
  const [newItem, setNewItem] = useState<Partial<ProcurementItem>>({
    description: "",
    category: "",
    quantity: 1,
    unitPrice: 0,
    specifications: ""
  })

  // Mock vendor data
  const vendors: Vendor[] = [
    {
      id: "VEN001",
      name: "TechCorp Solutions",
      email: "orders@techcorp.com",
      phone: "+1-555-0123",
      address: "123 Tech Street, Silicon Valley, CA",
      rating: 4.8
    },
    {
      id: "VEN002",
      name: "Office Supplies Plus",
      email: "sales@officesupplies.com",
      phone: "+1-555-0456",
      address: "456 Business Ave, Commerce City, NY",
      rating: 4.5
    },
    {
      id: "VEN003",
      name: "Lab Equipment Co",
      email: "info@labequipment.com",
      phone: "+1-555-0789",
      address: "789 Science Blvd, Research Park, MA",
      rating: 4.9
    }
  ]

  const categories = [
    "Office Supplies",
    "IT Equipment",
    "Laboratory Equipment",
    "Furniture",
    "Maintenance Supplies",
    "Software & Licenses",
    "Books & Educational Materials",
    "Utilities",
    "Professional Services",
    "Other"
  ]

  const addItem = () => {
    if (newItem.description && newItem.category && newItem.quantity && newItem.unitPrice) {
      const item: ProcurementItem = {
        id: `ITEM-${Date.now()}`,
        description: newItem.description,
        category: newItem.category,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        totalPrice: newItem.quantity * newItem.unitPrice,
        specifications: newItem.specifications
      }
      setItems(prev => [...prev, item])
      setNewItem({
        description: "",
        category: "",
        quantity: 1,
        unitPrice: 0,
        specifications: ""
      })
    }
  }

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateItem = (itemId: string, field: keyof ProcurementItem, value: any) => {
    setItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value }
          if (field === 'quantity' || field === 'unitPrice') {
            updated.totalPrice = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return item
      })
    )
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + tax
    return { subtotal, tax, total }
  }

  const totals = calculateTotals()
  const selectedVendor = vendors.find(v => v.id === vendor)

  const handleSubmit = () => {
    const procurementData = {
      orderDate,
      requiredDate,
      department,
      priority,
      vendor,
      description,
      justification,
      deliveryAddress,
      items,
      totals
    }
    console.log("Procurement data:", procurementData)
    onClose()
  }

  const handleReset = () => {
    setOrderDate(undefined)
    setRequiredDate(undefined)
    setDepartment("")
    setPriority("")
    setVendor("")
    setDescription("")
    setJustification("")
    setDeliveryAddress("")
    setItems([])
    setNewItem({
      description: "",
      category: "",
      quantity: 1,
      unitPrice: 0,
      specifications: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Create Purchase Order
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="vendor">Vendor & Delivery</TabsTrigger>
            <TabsTrigger value="items">Items & Pricing</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Purchase Order Information
                </CardTitle>
                <CardDescription>Enter basic purchase order details and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Requesting Department *</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !orderDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {orderDate ? format(orderDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={orderDate}
                          onSelect={setOrderDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Required Delivery Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !requiredDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {requiredDate ? format(requiredDate, "PPP") : "Required by"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={requiredDate}
                          onSelect={setRequiredDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Purchase Description *</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the purchase..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Business Justification *</Label>
                  <Textarea
                    id="justification"
                    placeholder="Explain why this purchase is necessary..."
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("vendor")}>
                Next: Vendor & Delivery
              </Button>
            </div>
          </TabsContent>

          {/* Vendor & Delivery Tab */}
          <TabsContent value="vendor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Vendor Selection
                </CardTitle>
                <CardDescription>Choose vendor and delivery information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Vendor *</Label>
                  <Select value={vendor} onValueChange={setVendor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{v.name}</span>
                            <Badge variant="outline">★ {v.rating}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVendor && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedVendor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs font-medium">Email</Label>
                          <div>{selectedVendor.email}</div>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Phone</Label>
                          <div>{selectedVendor.phone}</div>
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs font-medium">Address</Label>
                          <div>{selectedVendor.address}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="Enter complete delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("items")}>
                Next: Items & Pricing
              </Button>
            </div>
          </TabsContent>

          {/* Items & Pricing Tab */}
          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Add Items
                </CardTitle>
                <CardDescription>Add items to your purchase order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>Item Description *</Label>
                    <Input
                      placeholder="Item description"
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={newItem.category} 
                      onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Price *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button onClick={addItem} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specifications (Optional)</Label>
                  <Textarea
                    placeholder="Additional specifications or requirements..."
                    value={newItem.specifications}
                    onChange={(e) => setNewItem(prev => ({ ...prev, specifications: e.target.value }))}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No items added yet. Add items above to continue.
                  </div>
                )}

                {items.length > 0 && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>${totals.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("vendor")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("review")}>
                Next: Review
              </Button>
            </div>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Purchase Order Summary
                </CardTitle>
                <CardDescription>Review all details before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Department</Label>
                    <div className="text-sm">{department || "Not specified"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="text-sm">
                      <Badge variant={priority === "urgent" ? "destructive" : priority === "high" ? "default" : "secondary"}>
                        {priority || "Not set"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Order Date</Label>
                    <div className="text-sm">{orderDate ? format(orderDate, "PPP") : "Not set"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Required Date</Label>
                    <div className="text-sm">{requiredDate ? format(requiredDate, "PPP") : "Not set"}</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Vendor</Label>
                  <div className="text-sm">{selectedVendor?.name || "Not selected"}</div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Order Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{items.length}</div>
                      <div className="text-sm text-muted-foreground">Items</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${totals.subtotal.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Subtotal</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">${totals.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Items ({items.length})</Label>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                        <div>
                          <span className="text-sm font-medium">{item.description}</span>
                          <span className="text-xs text-muted-foreground ml-2">({item.quantity} × ${item.unitPrice})</span>
                        </div>
                        <span className="text-sm font-medium">${item.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("items")}>
                Previous
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset Form
                </Button>
                <Button onClick={handleSubmit}>
                  Submit Purchase Order
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
