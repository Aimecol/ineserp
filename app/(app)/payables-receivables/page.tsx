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
  Users,
  CreditCard,
  AlertTriangle,
  Calendar as CalendarIcon,
  Filter,
  Download,
  Clock
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { format, differenceInDays } from "date-fns"
import { cn, formatCurrency } from "@/lib/utils"

// Types
type RecordType = "Payable" | "Receivable"

type PayableReceivableRecord = {
  id: string
  type: RecordType
  entityName: string
  entityType: "Vendor" | "Customer" | "Employee" | "Other"
  description: string
  amount: number
  dueDate: string
  issueDate: string
  paymentTerms: string
  reference: string
  notes: string
  status: "Outstanding" | "Paid" | "Overdue" | "Partially Paid"
  paidAmount: number
  lastPaymentDate?: string
  createdAt: string
}

type Entity = {
  id: string
  name: string
  type: "Vendor" | "Customer" | "Employee" | "Other"
  email: string
  phone: string
  address: string
}

// Default entities
const defaultEntities: Entity[] = [
  { id: "ent-1", name: "CleanCo Services", type: "Vendor", email: "billing@cleanco.com", phone: "+1-555-0101", address: "123 Service St, City" },
  { id: "ent-2", name: "Smith Family", type: "Customer", email: "john.smith@email.com", phone: "+1-555-0102", address: "456 Parent Ave, City" },
  { id: "ent-3", name: "Foodies Catering", type: "Vendor", email: "orders@foodies.com", phone: "+1-555-0103", address: "789 Food Blvd, City" },
  { id: "ent-4", name: "Johnson Family", type: "Customer", email: "mary.johnson@email.com", phone: "+1-555-0104", address: "321 Student Rd, City" },
  { id: "ent-5", name: "Tech Solutions Inc", type: "Vendor", email: "support@techsol.com", phone: "+1-555-0105", address: "654 Tech Park, City" },
]

// Sample data
const sampleRecords: PayableReceivableRecord[] = [
  {
    id: "PR-8001",
    type: "Payable",
    entityName: "CleanCo Services",
    entityType: "Vendor",
    description: "Monthly cleaning services",
    amount: 940.00,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    issueDate: new Date().toISOString().split('T')[0],
    paymentTerms: "Net 30",
    reference: "INV-2024-001",
    notes: "Regular monthly service",
    status: "Outstanding",
    paidAmount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: "PR-8002",
    type: "Receivable",
    entityName: "Smith Family",
    entityType: "Customer",
    description: "Tuition fees - Q1",
    amount: 650.00,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
    issueDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 35 days ago
    paymentTerms: "Due on receipt",
    reference: "TUI-2024-001",
    notes: "First quarter tuition payment",
    status: "Paid",
    paidAmount: 650.00,
    lastPaymentDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  },
  {
    id: "PR-8003",
    type: "Payable",
    entityName: "Foodies Catering",
    entityType: "Vendor",
    description: "Event catering services",
    amount: 2200.00,
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
    issueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 40 days ago
    paymentTerms: "Net 30",
    reference: "CAT-2024-005",
    notes: "Annual fundraising dinner",
    status: "Overdue",
    paidAmount: 0,
    createdAt: new Date().toISOString()
  },
]

export default function PayablesReceivablesPage() {
  const [records, setRecords] = useState<PayableReceivableRecord[]>([])
  const [entities] = useState<Entity[]>(defaultEntities)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedEntityType, setSelectedEntityType] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<PayableReceivableRecord | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedDueDate, setSelectedDueDate] = useState<Date>()
  const [selectedIssueDate, setSelectedIssueDate] = useState<Date>()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    type: "Payable" as RecordType,
    entityName: "",
    entityType: "Vendor" as "Vendor" | "Customer" | "Employee" | "Other",
    description: "",
    amount: "",
    dueDate: "",
    issueDate: "",
    paymentTerms: "",
    reference: "",
    notes: "",
    status: "Outstanding" as "Outstanding" | "Paid" | "Overdue" | "Partially Paid",
    paidAmount: ""
  })

  useEffect(() => {
    setMounted(true)
    loadPayablesReceivablesData()
  }, [])

  const loadPayablesReceivablesData = () => {
    try {
      const savedRecords = localStorage.getItem('payables-receivables-records')
      if (savedRecords) {
        setRecords(JSON.parse(savedRecords))
      } else {
        setRecords(sampleRecords)
        localStorage.setItem('payables-receivables-records', JSON.stringify(sampleRecords))
      }
    } catch (error) {
      console.error('Error loading payables/receivables data:', error)
      setRecords(sampleRecords)
    }
  }

  const savePayablesReceivablesData = (newRecords: PayableReceivableRecord[]) => {
    try {
      localStorage.setItem('payables-receivables-records', JSON.stringify(newRecords))
      setRecords(newRecords)
    } catch (error) {
      console.error('Error saving payables/receivables data:', error)
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      })
    }
  }

  const generateId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `PR-${timestamp}-${random}`
  }

  const resetForm = () => {
    setFormData({
      type: "Payable",
      entityName: "",
      entityType: "Vendor",
      description: "",
      amount: "",
      dueDate: "",
      issueDate: "",
      paymentTerms: "",
      reference: "",
      notes: "",
      status: "Outstanding",
      paidAmount: ""
    })
    setSelectedDueDate(undefined)
    setSelectedIssueDate(undefined)
  }

  const getRecordStatus = (record: PayableReceivableRecord): "Outstanding" | "Paid" | "Overdue" | "Partially Paid" => {
    const today = new Date()
    const dueDate = new Date(record.dueDate)

    if (record.paidAmount >= record.amount) {
      return "Paid"
    } else if (record.paidAmount > 0) {
      return "Partially Paid"
    } else if (dueDate < today) {
      return "Overdue"
    } else {
      return "Outstanding"
    }
  }

  const handleAddRecord = () => {
    if (!formData.entityName || !formData.description || !formData.amount || !formData.dueDate || !formData.issueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const amount = parseFloat(formData.amount)
    const paidAmount = parseFloat(formData.paidAmount) || 0

    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (paidAmount > amount) {
      toast({
        title: "Error",
        description: "Paid amount cannot exceed total amount",
        variant: "destructive",
      })
      return
    }

    const newRecord: PayableReceivableRecord = {
      id: generateId(),
      type: formData.type,
      entityName: formData.entityName,
      entityType: formData.entityType,
      description: formData.description,
      amount,
      dueDate: formData.dueDate,
      issueDate: formData.issueDate,
      paymentTerms: formData.paymentTerms,
      reference: formData.reference,
      notes: formData.notes,
      status: formData.status,
      paidAmount,
      lastPaymentDate: paidAmount > 0 ? new Date().toISOString().split('T')[0] : undefined,
      createdAt: new Date().toISOString()
    }

    // Auto-calculate status based on payment and due date
    newRecord.status = getRecordStatus(newRecord)

    const newRecords = [...records, newRecord]
    savePayablesReceivablesData(newRecords)
    resetForm()
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: `${formData.type} record added successfully`,
    })
  }

  const handleEditRecord = () => {
    if (!editingRecord || !formData.entityName || !formData.description || !formData.amount || !formData.dueDate || !formData.issueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const amount = parseFloat(formData.amount)
    const paidAmount = parseFloat(formData.paidAmount) || 0

    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (paidAmount > amount) {
      toast({
        title: "Error",
        description: "Paid amount cannot exceed total amount",
        variant: "destructive",
      })
      return
    }

    const updatedRecord: PayableReceivableRecord = {
      ...editingRecord,
      type: formData.type,
      entityName: formData.entityName,
      entityType: formData.entityType,
      description: formData.description,
      amount,
      dueDate: formData.dueDate,
      issueDate: formData.issueDate,
      paymentTerms: formData.paymentTerms,
      reference: formData.reference,
      notes: formData.notes,
      status: formData.status,
      paidAmount,
      lastPaymentDate: paidAmount > editingRecord.paidAmount ? new Date().toISOString().split('T')[0] : editingRecord.lastPaymentDate
    }

    // Auto-calculate status based on payment and due date
    updatedRecord.status = getRecordStatus(updatedRecord)

    const newRecords = records.map(record =>
      record.id === editingRecord.id ? updatedRecord : record
    )
    savePayablesReceivablesData(newRecords)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingRecord(null)

    toast({
      title: "Success",
      description: "Record updated successfully",
    })
  }

  const handleDeleteRecord = (recordId: string) => {
    const newRecords = records.filter(record => record.id !== recordId)
    savePayablesReceivablesData(newRecords)

    toast({
      title: "Success",
      description: "Record deleted successfully",
    })
  }

  const openEditDialog = (record: PayableReceivableRecord) => {
    setEditingRecord(record)
    setFormData({
      type: record.type,
      entityName: record.entityName,
      entityType: record.entityType,
      description: record.description,
      amount: record.amount.toString(),
      dueDate: record.dueDate,
      issueDate: record.issueDate,
      paymentTerms: record.paymentTerms,
      reference: record.reference,
      notes: record.notes,
      status: record.status,
      paidAmount: record.paidAmount.toString()
    })
    setSelectedDueDate(new Date(record.dueDate))
    setSelectedIssueDate(new Date(record.issueDate))
    setIsEditDialogOpen(true)
  }

  // Filter records based on search and filters
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || record.type === selectedType
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus
    const matchesEntityType = selectedEntityType === "all" || record.entityType === selectedEntityType

    return matchesSearch && matchesType && matchesStatus && matchesEntityType
  })

  // Calculate summary statistics
  const totalPayables = records
    .filter(record => record.type === "Payable" && record.status !== "Paid")
    .reduce((sum, record) => sum + (record.amount - record.paidAmount), 0)

  const totalReceivables = records
    .filter(record => record.type === "Receivable" && record.status !== "Paid")
    .reduce((sum, record) => sum + (record.amount - record.paidAmount), 0)

  const overduePayables = records.filter(record =>
    record.type === "Payable" && record.status === "Overdue"
  ).length

  const overdueReceivables = records.filter(record =>
    record.type === "Receivable" && record.status === "Overdue"
  ).length

  const getDaysOverdue = (dueDate: string): number => {
    const today = new Date()
    const due = new Date(dueDate)
    return Math.max(0, differenceInDays(today, due))
  }

  const StatusBadge = ({ status }: { status: "Outstanding" | "Paid" | "Overdue" | "Partially Paid" }) => {
    if (status === "Paid") {
      return <Badge className="bg-[#32872e] text-white hover:bg-[#256a24]">Paid</Badge>
    }
    if (status === "Outstanding") {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Outstanding</Badge>
    }
    if (status === "Partially Paid") {
      return <Badge className="bg-[#e0d722] text-black hover:bg-[#d5cc20]">Partially Paid</Badge>
    }
    return <Badge className="bg-[#ef4444] text-white hover:bg-[#dc2626]">Overdue</Badge>
  }

  const TypeBadge = ({ type }: { type: RecordType }) => {
    if (type === "Payable") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Payable</Badge>
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Receivable</Badge>
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
          <h2 className="text-2xl font-bold text-black">Payables & Receivables</h2>
          <p className="text-sm text-gray-600">Track outstanding payments and receivables</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#32872e] hover:bg-[#e0d722] hover:text-black text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Record</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Record Type *</Label>
                  <Select value={formData.type} onValueChange={(value: RecordType) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payable">Payable (Money we owe)</SelectItem>
                      <SelectItem value="Receivable">Receivable (Money owed to us)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type *</Label>
                  <Select value={formData.entityType} onValueChange={(value: "Vendor" | "Customer" | "Employee" | "Other") => setFormData({ ...formData, entityType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entityName">Entity Name *</Label>
                <Select value={formData.entityName} onValueChange={(value) => setFormData({ ...formData, entityName: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter entity name" />
                  </SelectTrigger>
                  <SelectContent>
                    {entities
                      .filter(entity => entity.type === formData.entityType)
                      .map((entity) => (
                        <SelectItem key={entity.id} value={entity.name}>
                          {entity.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paidAmount">Paid Amount</Label>
                  <Input
                    id="paidAmount"
                    type="number"
                    step="0.01"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select value={formData.paymentTerms} onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="Net 90">Net 90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="Invoice/Reference number"
                  />
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
              <Button onClick={handleAddRecord} className="bg-[#32872e] hover:bg-[#256a24] text-white">
                Add Record
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payables</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalPayables, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Outstanding amounts owed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receivables</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalReceivables, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Outstanding amounts due
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payables</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overduePayables}</div>
            <p className="text-xs text-muted-foreground">
              Past due payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Receivables</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{overdueReceivables}</div>
            <p className="text-xs text-muted-foreground">
              Past due collections
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
              placeholder="Search records..."
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
              <SelectItem value="Payable">Payables</SelectItem>
              <SelectItem value="Receivable">Receivables</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedEntityType} onValueChange={setSelectedEntityType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="Vendor">Vendors</SelectItem>
              <SelectItem value="Customer">Customers</SelectItem>
              <SelectItem value="Employee">Employees</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Outstanding">Outstanding</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Partially Paid">Partially Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Records Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">ID</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[180px]">Entity</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="min-w-[120px]">Amount</TableHead>
                <TableHead className="min-w-[120px]">Paid</TableHead>
                <TableHead className="min-w-[120px]">Balance</TableHead>
                <TableHead className="min-w-[120px]">Due Date</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Reference</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => {
                  const daysOverdue = getDaysOverdue(record.dueDate)
                  const balance = record.amount - record.paidAmount

                  return (
                    <TableRow key={record.id} className="hover:bg-[#f0f1f2]">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <TypeBadge type={record.type} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.entityName}</div>
                          <div className="text-sm text-gray-500">{record.entityType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.description}</div>
                          {record.notes && (
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">
                              {record.notes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${record.type === 'Receivable' ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(record.amount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(record.paidAmount)}
                        </div>
                        {record.lastPaymentDate && (
                          <div className="text-xs text-gray-500">
                            Last: {format(new Date(record.lastPaymentDate), "MMM dd")}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${balance > 0 ? (record.type === 'Receivable' ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                          ${balance.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{format(new Date(record.dueDate), "MMM dd, yyyy")}</div>
                          {record.status === "Overdue" && (
                            <div className="text-xs text-red-500">
                              {daysOverdue} days overdue
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={record.status} />
                      </TableCell>
                      <TableCell>{record.reference || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(record)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecord(record.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Record Type *</Label>
                <Select value={formData.type} onValueChange={(value: RecordType) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Payable">Payable (Money we owe)</SelectItem>
                    <SelectItem value="Receivable">Receivable (Money owed to us)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-entityType">Entity Type *</Label>
                <Select value={formData.entityType} onValueChange={(value: "Vendor" | "Customer" | "Employee" | "Other") => setFormData({ ...formData, entityType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vendor">Vendor</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-entityName">Entity Name *</Label>
              <Select value={formData.entityName} onValueChange={(value) => setFormData({ ...formData, entityName: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or enter entity name" />
                </SelectTrigger>
                <SelectContent>
                  {entities
                    .filter(entity => entity.type === formData.entityType)
                    .map((entity) => (
                      <SelectItem key={entity.id} value={entity.name}>
                        {entity.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Total Amount *</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-paidAmount">Paid Amount</Label>
                <Input
                  id="edit-paidAmount"
                  type="number"
                  step="0.01"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-paymentTerms">Payment Terms</Label>
                <Select value={formData.paymentTerms} onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                    <SelectItem value="Net 90">Net 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reference">Reference</Label>
                <Input
                  id="edit-reference"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="Invoice/Reference number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRecord} className="bg-[#32872e] hover:bg-[#256a24] text-white">
              Update Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
