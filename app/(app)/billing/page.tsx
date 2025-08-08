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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  FileText,
  Receipt,
  DollarSign,
  Calendar as CalendarIcon,
  Filter,
  Download,
  Eye,
  Send,
  Printer
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"

// Types
type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"
type DocumentType = "Invoice" | "Receipt" | "Credit Note"

type LineItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

type BillingDocument = {
  id: string
  documentNumber: string
  type: DocumentType
  customerName: string
  customerEmail: string
  customerAddress: string
  issueDate: string
  dueDate: string
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  paidAmount: number
  status: InvoiceStatus
  notes: string
  lineItems: LineItem[]
  paymentMethod?: string
  paymentDate?: string
  createdAt: string
}

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

// Default customers
const defaultCustomers: Customer[] = [
  { id: "cust-1", name: "Smith Family", email: "john.smith@email.com", phone: "+1-555-0101", address: "123 Parent Ave, City, State 12345" },
  { id: "cust-2", name: "Johnson Family", email: "mary.johnson@email.com", phone: "+1-555-0102", address: "456 Student Rd, City, State 12345" },
  { id: "cust-3", name: "Brown Family", email: "david.brown@email.com", phone: "+1-555-0103", address: "789 Education Blvd, City, State 12345" },
  { id: "cust-4", name: "Wilson Family", email: "sarah.wilson@email.com", phone: "+1-555-0104", address: "321 Learning St, City, State 12345" },
  { id: "cust-5", name: "Davis Corporation", email: "billing@davis.com", phone: "+1-555-0105", address: "654 Business Park, City, State 12345" },
]

// Sample data
const sampleDocuments: BillingDocument[] = [
  {
    id: "BL-9001",
    documentNumber: "INV-4492",
    type: "Invoice",
    customerName: "Smith Family",
    customerEmail: "john.smith@email.com",
    customerAddress: "123 Parent Ave, City, State 12345",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: addDays(new Date(), 30).toISOString().split('T')[0],
    subtotal: 1363.64,
    taxRate: 10,
    taxAmount: 136.36,
    total: 1500.00,
    paidAmount: 1500.00,
    status: "Paid",
    notes: "Q1 Tuition fees",
    lineItems: [
      { id: "li-1", description: "Tuition Fee - Q1", quantity: 1, unitPrice: 1200.00, total: 1200.00 },
      { id: "li-2", description: "Activity Fee", quantity: 1, unitPrice: 163.64, total: 163.64 }
    ],
    paymentMethod: "Bank Transfer",
    paymentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  },
  {
    id: "BL-9002",
    documentNumber: "INV-4493",
    type: "Invoice",
    customerName: "Johnson Family",
    customerEmail: "mary.johnson@email.com",
    customerAddress: "456 Student Rd, City, State 12345",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: addDays(new Date(), 15).toISOString().split('T')[0],
    subtotal: 890.91,
    taxRate: 10,
    taxAmount: 89.09,
    total: 980.00,
    paidAmount: 0,
    status: "Sent",
    notes: "Monthly fees",
    lineItems: [
      { id: "li-3", description: "Monthly Tuition", quantity: 1, unitPrice: 800.00, total: 800.00 },
      { id: "li-4", description: "Lab Fee", quantity: 1, unitPrice: 90.91, total: 90.91 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "BL-9003",
    documentNumber: "INV-4494",
    type: "Invoice",
    customerName: "Brown Family",
    customerEmail: "david.brown@email.com",
    customerAddress: "789 Education Blvd, City, State 12345",
    issueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subtotal: 1909.09,
    taxRate: 10,
    taxAmount: 190.91,
    total: 2100.00,
    paidAmount: 0,
    status: "Overdue",
    notes: "Semester fees",
    lineItems: [
      { id: "li-5", description: "Semester Tuition", quantity: 1, unitPrice: 1800.00, total: 1800.00 },
      { id: "li-6", description: "Technology Fee", quantity: 1, unitPrice: 109.09, total: 109.09 }
    ],
    createdAt: new Date().toISOString()
  },
]

export default function BillingPage() {
  const [documents, setDocuments] = useState<BillingDocument[]>([])
  const [customers] = useState<Customer[]>(defaultCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<BillingDocument | null>(null)
  const [viewingDocument, setViewingDocument] = useState<BillingDocument | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedIssueDate, setSelectedIssueDate] = useState<Date>()
  const [selectedDueDate, setSelectedDueDate] = useState<Date>()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    type: "Invoice" as DocumentType,
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    issueDate: "",
    dueDate: "",
    taxRate: "10",
    notes: "",
    status: "Draft" as InvoiceStatus
  })

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 }
  ])

  useEffect(() => {
    setMounted(true)
    loadBillingData()
  }, [])

  const loadBillingData = () => {
    try {
      const savedDocuments = localStorage.getItem('billing-documents')
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments))
      } else {
        setDocuments(sampleDocuments)
        localStorage.setItem('billing-documents', JSON.stringify(sampleDocuments))
      }
    } catch (error) {
      console.error('Error loading billing data:', error)
      setDocuments(sampleDocuments)
    }
  }

  const saveBillingData = (newDocuments: BillingDocument[]) => {
    try {
      localStorage.setItem('billing-documents', JSON.stringify(newDocuments))
      setDocuments(newDocuments)
    } catch (error) {
      console.error('Error saving billing data:', error)
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      })
    }
  }

  const generateDocumentNumber = (type: DocumentType) => {
    const prefix = type === "Invoice" ? "INV" : type === "Receipt" ? "REC" : "CN"
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `${prefix}-${timestamp}-${random}`
  }

  const generateId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `BL-${timestamp}-${random}`
  }

  const resetForm = () => {
    setFormData({
      type: "Invoice",
      customerName: "",
      customerEmail: "",
      customerAddress: "",
      issueDate: "",
      dueDate: "",
      taxRate: "10",
      notes: "",
      status: "Draft"
    })
    setLineItems([{ id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 }])
    setSelectedIssueDate(undefined)
    setSelectedDueDate(undefined)
  }

  const calculateLineItemTotal = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice
  }

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTaxAmount = (subtotal: number, taxRate: number) => {
    return (subtotal * taxRate) / 100
  }

  const calculateTotal = (subtotal: number, taxAmount: number) => {
    return subtotal + taxAmount
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedItems = [...lineItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].total = calculateLineItemTotal(
        updatedItems[index].quantity,
        updatedItems[index].unitPrice
      )
    }

    setLineItems(updatedItems)
  }

  const addLineItem = () => {
    const newId = (lineItems.length + 1).toString()
    setLineItems([...lineItems, { id: newId, description: "", quantity: 1, unitPrice: 0, total: 0 }])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const getDocumentStatus = (document: BillingDocument): InvoiceStatus => {
    if (document.status === "Cancelled") return "Cancelled"
    if (document.paidAmount >= document.total) return "Paid"
    if (document.status === "Draft") return "Draft"

    const today = new Date()
    const dueDate = new Date(document.dueDate)

    if (dueDate < today && document.paidAmount < document.total) {
      return "Overdue"
    }

    return "Sent"
  }

  const handleAddDocument = () => {
    if (!formData.customerName || !formData.issueDate || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const validLineItems = lineItems.filter(item => item.description.trim() !== "")
    if (validLineItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one line item",
        variant: "destructive",
      })
      return
    }

    const subtotal = calculateSubtotal()
    const taxRate = parseFloat(formData.taxRate) || 0
    const taxAmount = calculateTaxAmount(subtotal, taxRate)
    const total = calculateTotal(subtotal, taxAmount)

    const newDocument: BillingDocument = {
      id: generateId(),
      documentNumber: generateDocumentNumber(formData.type),
      type: formData.type,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerAddress: formData.customerAddress,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      subtotal,
      taxRate,
      taxAmount,
      total,
      paidAmount: 0,
      status: formData.status,
      notes: formData.notes,
      lineItems: validLineItems,
      createdAt: new Date().toISOString()
    }

    const newDocuments = [...documents, newDocument]
    saveBillingData(newDocuments)
    resetForm()
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: `${formData.type} created successfully`,
    })
  }

  const handleEditDocument = () => {
    if (!editingDocument || !formData.customerName || !formData.issueDate || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const validLineItems = lineItems.filter(item => item.description.trim() !== "")
    if (validLineItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one line item",
        variant: "destructive",
      })
      return
    }

    const subtotal = calculateSubtotal()
    const taxRate = parseFloat(formData.taxRate) || 0
    const taxAmount = calculateTaxAmount(subtotal, taxRate)
    const total = calculateTotal(subtotal, taxAmount)

    const updatedDocument: BillingDocument = {
      ...editingDocument,
      type: formData.type,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerAddress: formData.customerAddress,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      subtotal,
      taxRate,
      taxAmount,
      total,
      status: formData.status,
      notes: formData.notes,
      lineItems: validLineItems
    }

    const newDocuments = documents.map(doc =>
      doc.id === editingDocument.id ? updatedDocument : doc
    )
    saveBillingData(newDocuments)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingDocument(null)

    toast({
      title: "Success",
      description: "Document updated successfully",
    })
  }

  const handleDeleteDocument = (documentId: string) => {
    const newDocuments = documents.filter(doc => doc.id !== documentId)
    saveBillingData(newDocuments)

    toast({
      title: "Success",
      description: "Document deleted successfully",
    })
  }

  const openEditDialog = (document: BillingDocument) => {
    setEditingDocument(document)
    setFormData({
      type: document.type,
      customerName: document.customerName,
      customerEmail: document.customerEmail,
      customerAddress: document.customerAddress,
      issueDate: document.issueDate,
      dueDate: document.dueDate,
      taxRate: document.taxRate.toString(),
      notes: document.notes,
      status: document.status
    })
    setLineItems(document.lineItems)
    setSelectedIssueDate(new Date(document.issueDate))
    setSelectedDueDate(new Date(document.dueDate))
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (document: BillingDocument) => {
    setViewingDocument(document)
    setIsViewDialogOpen(true)
  }

  const handleCustomerSelect = (customerName: string) => {
    const customer = customers.find(c => c.name === customerName)
    if (customer) {
      setFormData({
        ...formData,
        customerName: customer.name,
        customerEmail: customer.email,
        customerAddress: customer.address
      })
    }
  }

  const simulatePDFExport = (document: BillingDocument) => {
    toast({
      title: "PDF Export",
      description: `${document.type} ${document.documentNumber} exported successfully`,
    })
  }

  const simulateEmailSend = (document: BillingDocument) => {
    const updatedDocument = { ...document, status: "Sent" as InvoiceStatus }
    const newDocuments = documents.map(doc =>
      doc.id === document.id ? updatedDocument : doc
    )
    saveBillingData(newDocuments)

    toast({
      title: "Email Sent",
      description: `${document.type} sent to ${document.customerEmail}`,
    })
  }

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.notes.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate summary statistics
  const totalInvoiced = documents
    .filter(doc => doc.type === "Invoice")
    .reduce((sum, doc) => sum + doc.total, 0)

  const totalPaid = documents
    .reduce((sum, doc) => sum + doc.paidAmount, 0)

  const totalOutstanding = documents
    .filter(doc => doc.status !== "Paid" && doc.status !== "Cancelled")
    .reduce((sum, doc) => sum + (doc.total - doc.paidAmount), 0)

  const overdueCount = documents.filter(doc => doc.status === "Overdue").length

  const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
    if (status === "Paid") {
      return <Badge className="bg-[#32872e] text-white hover:bg-[#256a24]">Paid</Badge>
    }
    if (status === "Sent") {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Sent</Badge>
    }
    if (status === "Draft") {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>
    }
    if (status === "Overdue") {
      return <Badge className="bg-[#ef4444] text-white hover:bg-[#dc2626]">Overdue</Badge>
    }
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>
  }

  const TypeBadge = ({ type }: { type: DocumentType }) => {
    if (type === "Invoice") {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Invoice</Badge>
    }
    if (type === "Receipt") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Receipt</Badge>
    }
    return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Credit Note</Badge>
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
          <h2 className="text-2xl font-bold text-black">Billing & Receipting</h2>
          <p className="text-sm text-gray-600">Create and manage invoices, receipts, and billing documents</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#32872e] hover:bg-[#e0d722] hover:text-black text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type *</Label>
                  <Select value={formData.type} onValueChange={(value: DocumentType) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Invoice">Invoice</SelectItem>
                      <SelectItem value="Receipt">Receipt</SelectItem>
                      <SelectItem value="Credit Note">Credit Note</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: InvoiceStatus) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Customer *</Label>
                <Select value={formData.customerName} onValueChange={handleCustomerSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="customer@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerAddress">Customer Address</Label>
                <Textarea
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  placeholder="Customer address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedIssueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedIssueDate ? format(selectedIssueDate, "PPP") : <span>Pick issue date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedIssueDate}
                        onSelect={(date) => {
                          setSelectedIssueDate(date)
                          setFormData({ ...formData, issueDate: date ? format(date, "yyyy-MM-dd") : "" })
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Due Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDueDate ? format(selectedDueDate, "PPP") : <span>Pick due date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDueDate}
                        onSelect={(date) => {
                          setSelectedDueDate(date)
                          setFormData({ ...formData, dueDate: date ? format(date, "yyyy-MM-dd") : "" })
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Line Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-2">
                  {lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          value={`$${item.total.toFixed(2)}`}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(index)}
                          disabled={lineItems.length === 1}
                          className="h-10 w-10 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({formData.taxRate}%):</span>
                    <span>${calculateTaxAmount(calculateSubtotal(), parseFloat(formData.taxRate) || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal(calculateSubtotal(), calculateTaxAmount(calculateSubtotal(), parseFloat(formData.taxRate) || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDocument} className="bg-[#32872e] hover:bg-[#256a24] text-white">
                Create Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              All invoices issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Payments received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Receipt className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ${totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Past due invoices
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
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Invoice">Invoices</SelectItem>
              <SelectItem value="Receipt">Receipts</SelectItem>
              <SelectItem value="Credit Note">Credit Notes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Documents Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Document #</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[180px]">Customer</TableHead>
                <TableHead className="min-w-[120px]">Issue Date</TableHead>
                <TableHead className="min-w-[120px]">Due Date</TableHead>
                <TableHead className="min-w-[120px]">Total</TableHead>
                <TableHead className="min-w-[120px]">Paid</TableHead>
                <TableHead className="min-w-[120px]">Balance</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    No documents found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((document) => {
                  const balance = document.total - document.paidAmount

                  return (
                    <TableRow key={document.id} className="hover:bg-[#f0f1f2]">
                      <TableCell className="font-medium">{document.documentNumber}</TableCell>
                      <TableCell>
                        <TypeBadge type={document.type} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{document.customerName}</div>
                          <div className="text-sm text-gray-500">{document.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(document.issueDate), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{format(new Date(document.dueDate), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <div className="font-medium">${document.total.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${document.paidAmount.toFixed(2)}</div>
                        {document.paymentDate && (
                          <div className="text-xs text-gray-500">
                            Paid: {format(new Date(document.paymentDate), "MMM dd")}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${balance > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          ${balance.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={document.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(document)}
                            className="h-8 w-8 p-0"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(document)}
                            className="h-8 w-8 p-0"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => simulatePDFExport(document)}
                            className="h-8 w-8 p-0"
                            title="Export PDF"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          {document.status === "Draft" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => simulateEmailSend(document)}
                              className="h-8 w-8 p-0"
                              title="Send"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDocument(document.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  )
}
