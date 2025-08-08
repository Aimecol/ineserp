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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar as CalendarIcon,
  Filter,
  Download
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Types
type TransactionType = "Income" | "Expense"

type IncomeExpenseEntry = {
  id: string
  type: TransactionType
  description: string
  category: string
  amount: number
  date: string
  paymentMethod: string
  reference: string
  notes: string
  status: "Completed" | "Pending" | "Cancelled"
  createdAt: string
}

type Category = {
  id: string
  name: string
  type: TransactionType
  description: string
}

// Default categories
const defaultCategories: Category[] = [
  // Income categories
  { id: "inc-1", name: "Tuition Fees", type: "Income", description: "Student tuition payments" },
  { id: "inc-2", name: "Donations", type: "Income", description: "Charitable donations and grants" },
  { id: "inc-3", name: "Government Funding", type: "Income", description: "Government grants and subsidies" },
  { id: "inc-4", name: "Other Income", type: "Income", description: "Miscellaneous income sources" },

  // Expense categories
  { id: "exp-1", name: "Salaries & Benefits", type: "Expense", description: "Staff salaries and benefits" },
  { id: "exp-2", name: "Utilities", type: "Expense", description: "Electricity, water, internet, etc." },
  { id: "exp-3", name: "Supplies", type: "Expense", description: "Office and educational supplies" },
  { id: "exp-4", name: "Maintenance", type: "Expense", description: "Building and equipment maintenance" },
  { id: "exp-5", name: "Transportation", type: "Expense", description: "Vehicle and travel expenses" },
  { id: "exp-6", name: "Other Expenses", type: "Expense", description: "Miscellaneous expenses" },
]

// Sample data
const sampleEntries: IncomeExpenseEntry[] = [
  {
    id: "IE-7001",
    type: "Income",
    description: "Donation Drive",
    category: "Donations",
    amount: 6540.00,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: "Bank Transfer",
    reference: "DON-2024-001",
    notes: "Annual fundraising event",
    status: "Completed",
    createdAt: new Date().toISOString()
  },
  {
    id: "IE-7002",
    type: "Expense",
    description: "Cafeteria Supplies",
    category: "Supplies",
    amount: 1120.00,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: "Credit Card",
    reference: "SUP-2024-045",
    notes: "Monthly food supplies",
    status: "Pending",
    createdAt: new Date().toISOString()
  },
  {
    id: "IE-7003",
    type: "Expense",
    description: "Sports Equipment",
    category: "Supplies",
    amount: 2300.00,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: "Check",
    reference: "EQP-2024-012",
    notes: "New basketball equipment",
    status: "Completed",
    createdAt: new Date().toISOString()
  },
]

export default function IncomeExpensesPage() {
  const [entries, setEntries] = useState<IncomeExpenseEntry[]>([])
  const [categories] = useState<Category[]>(defaultCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<IncomeExpenseEntry | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    type: "Income" as TransactionType,
    description: "",
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
    reference: "",
    notes: "",
    status: "Completed" as "Completed" | "Pending" | "Cancelled"
  })

  useEffect(() => {
    setMounted(true)
    loadIncomeExpenseData()
  }, [])

  const loadIncomeExpenseData = () => {
    try {
      const savedEntries = localStorage.getItem('income-expense-entries')
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries))
      } else {
        setEntries(sampleEntries)
        localStorage.setItem('income-expense-entries', JSON.stringify(sampleEntries))
      }
    } catch (error) {
      console.error('Error loading income/expense data:', error)
      setEntries(sampleEntries)
    }
  }

  const saveIncomeExpenseData = (newEntries: IncomeExpenseEntry[]) => {
    try {
      localStorage.setItem('income-expense-entries', JSON.stringify(newEntries))
      setEntries(newEntries)
    } catch (error) {
      console.error('Error saving income/expense data:', error)
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
    return `IE-${timestamp}-${random}`
  }

  const resetForm = () => {
    setFormData({
      type: "Income",
      description: "",
      category: "",
      amount: "",
      date: "",
      paymentMethod: "",
      reference: "",
      notes: "",
      status: "Completed"
    })
    setSelectedDate(undefined)
  }

  const handleAddEntry = () => {
    if (!formData.description || !formData.category || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    const newEntry: IncomeExpenseEntry = {
      id: generateId(),
      type: formData.type,
      description: formData.description,
      category: formData.category,
      amount,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      reference: formData.reference,
      notes: formData.notes,
      status: formData.status,
      createdAt: new Date().toISOString()
    }

    const newEntries = [...entries, newEntry]
    saveIncomeExpenseData(newEntries)
    resetForm()
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: `${formData.type} entry added successfully`,
    })
  }

  const handleEditEntry = () => {
    if (!editingEntry || !formData.description || !formData.category || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    const updatedEntry: IncomeExpenseEntry = {
      ...editingEntry,
      type: formData.type,
      description: formData.description,
      category: formData.category,
      amount,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      reference: formData.reference,
      notes: formData.notes,
      status: formData.status
    }

    const newEntries = entries.map(entry =>
      entry.id === editingEntry.id ? updatedEntry : entry
    )
    saveIncomeExpenseData(newEntries)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingEntry(null)

    toast({
      title: "Success",
      description: "Entry updated successfully",
    })
  }

  const handleDeleteEntry = (entryId: string) => {
    const newEntries = entries.filter(entry => entry.id !== entryId)
    saveIncomeExpenseData(newEntries)

    toast({
      title: "Success",
      description: "Entry deleted successfully",
    })
  }

  const openEditDialog = (entry: IncomeExpenseEntry) => {
    setEditingEntry(entry)
    setFormData({
      type: entry.type,
      description: entry.description,
      category: entry.category,
      amount: entry.amount.toString(),
      date: entry.date,
      paymentMethod: entry.paymentMethod,
      reference: entry.reference,
      notes: entry.notes,
      status: entry.status
    })
    setSelectedDate(new Date(entry.date))
    setIsEditDialogOpen(true)
  }

  // Filter entries based on search and filters
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || entry.type === selectedType
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || entry.status === selectedStatus

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  // Calculate summary statistics
  const totalIncome = entries
    .filter(entry => entry.type === "Income" && entry.status === "Completed")
    .reduce((sum, entry) => sum + entry.amount, 0)

  const totalExpenses = entries
    .filter(entry => entry.type === "Expense" && entry.status === "Completed")
    .reduce((sum, entry) => sum + entry.amount, 0)

  const netIncome = totalIncome - totalExpenses
  const pendingTransactions = entries.filter(entry => entry.status === "Pending").length

  const getAvailableCategories = (type: TransactionType) => {
    return categories.filter(cat => cat.type === type)
  }

  const StatusBadge = ({ status }: { status: "Completed" | "Pending" | "Cancelled" }) => {
    if (status === "Completed") {
      return <Badge className="bg-[#32872e] text-white hover:bg-[#256a24]">Completed</Badge>
    }
    if (status === "Pending") {
      return <Badge className="bg-[#e0d722] text-black hover:bg-[#d5cc20]">Pending</Badge>
    }
    return <Badge className="bg-[#ef4444] text-white hover:bg-[#dc2626]">Cancelled</Badge>
  }

  const TypeBadge = ({ type }: { type: TransactionType }) => {
    if (type === "Income") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Income</Badge>
    }
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expense</Badge>
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
          <h2 className="text-2xl font-bold text-black">Income & Expenses</h2>
          <p className="text-sm text-gray-600">Track and manage your financial transactions</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#32872e] hover:bg-[#e0d722] hover:text-black text-white">
              <Plus className="mr-2 h-4 w-4" />
              Record Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Transaction Type *</Label>
                  <Select value={formData.type} onValueChange={(value: TransactionType) => {
                    setFormData({ ...formData, type: value, category: "" })
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCategories(formData.type).map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter transaction description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
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
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date)
                          setFormData({ ...formData, date: date ? format(date, "yyyy-MM-dd") : "" })
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="Reference number or code"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: "Completed" | "Pending" | "Cancelled") => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or comments"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEntry} className="bg-[#32872e] hover:bg-[#256a24] text-white">
                Add Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className={`h-4 w-4 ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(netIncome).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {netIncome >= 0 ? 'Profit' : 'Loss'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CalendarIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting completion
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
              placeholder="Search transactions..."
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
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
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
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">ID</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="min-w-[150px]">Category</TableHead>
                <TableHead className="min-w-[120px]">Amount</TableHead>
                <TableHead className="min-w-[120px]">Date</TableHead>
                <TableHead className="min-w-[140px]">Payment Method</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Reference</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-[#f0f1f2]">
                    <TableCell className="font-medium">{entry.id}</TableCell>
                    <TableCell>
                      <TypeBadge type={entry.type} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.description}</div>
                        {entry.notes && (
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>
                      <div className={`font-medium ${entry.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.type === 'Income' ? '+' : '-'}${entry.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(entry.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{entry.paymentMethod || "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={entry.status} />
                    </TableCell>
                    <TableCell>{entry.reference || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(entry)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEntry(entry.id)}
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
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Transaction Type *</Label>
                <Select value={formData.type} onValueChange={(value: TransactionType) => {
                  setFormData({ ...formData, type: value, category: "" })
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableCategories(formData.type).map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter transaction description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Amount *</Label>
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
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setFormData({ ...formData, date: date ? format(date, "yyyy-MM-dd") : "" })
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-paymentMethod">Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reference">Reference</Label>
                <Input
                  id="edit-reference"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="Reference number or code"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "Completed" | "Pending" | "Cancelled") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or comments"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEntry} className="bg-[#32872e] hover:bg-[#256a24] text-white">
              Update Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
