"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Search,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  manager: string
  status: "planning" | "active" | "completed" | "on_hold" | "cancelled"
  budget: number
  spent: number
  remaining: number
  startDate: string
  endDate: string
  progress: number
  category: "research" | "infrastructure" | "academic" | "administrative"
}

interface ProjectExpense {
  id: string
  projectId: string
  projectName: string
  description: string
  category: "personnel" | "equipment" | "supplies" | "travel" | "other"
  amount: number
  date: string
  vendor: string
  status: "pending" | "approved" | "paid"
  approvedBy?: string
}

interface ProjectBudget {
  id: string
  projectId: string
  projectName: string
  category: string
  budgetedAmount: number
  spentAmount: number
  remainingAmount: number
  utilizationRate: number
}

export default function ProjectAccountsTabs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddProject, setShowAddProject] = useState(false)
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)

  // Mock data
  const projects: Project[] = [
    {
      id: "PRJ001",
      name: "Campus WiFi Upgrade",
      description: "Upgrade campus-wide wireless infrastructure",
      manager: "John Smith",
      status: "active",
      budget: 150000,
      spent: 95000,
      remaining: 55000,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      progress: 63,
      category: "infrastructure"
    },
    {
      id: "PRJ002",
      name: "AI Research Initiative",
      description: "Machine learning research program",
      manager: "Dr. Sarah Johnson",
      status: "active",
      budget: 250000,
      spent: 180000,
      remaining: 70000,
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      progress: 72,
      category: "research"
    },
    {
      id: "PRJ003",
      name: "Library Renovation",
      description: "Complete renovation of main library",
      manager: "Mike Wilson",
      status: "completed",
      budget: 500000,
      spent: 485000,
      remaining: 15000,
      startDate: "2023-06-01",
      endDate: "2024-01-31",
      progress: 100,
      category: "infrastructure"
    }
  ]

  const expenses: ProjectExpense[] = [
    {
      id: "EXP001",
      projectId: "PRJ001",
      projectName: "Campus WiFi Upgrade",
      description: "Network equipment purchase",
      category: "equipment",
      amount: 45000,
      date: "2024-08-01",
      vendor: "TechCorp Solutions",
      status: "paid",
      approvedBy: "John Smith"
    },
    {
      id: "EXP002",
      projectId: "PRJ002",
      projectName: "AI Research Initiative",
      description: "Research assistant salary",
      category: "personnel",
      amount: 15000,
      date: "2024-08-15",
      vendor: "Internal",
      status: "approved",
      approvedBy: "Dr. Sarah Johnson"
    },
    {
      id: "EXP003",
      projectId: "PRJ001",
      projectName: "Campus WiFi Upgrade",
      description: "Installation services",
      category: "other",
      amount: 25000,
      date: "2024-08-20",
      vendor: "InstallPro Inc",
      status: "pending"
    }
  ]

  const budgets: ProjectBudget[] = [
    {
      id: "BUD001",
      projectId: "PRJ001",
      projectName: "Campus WiFi Upgrade",
      category: "Equipment",
      budgetedAmount: 80000,
      spentAmount: 45000,
      remainingAmount: 35000,
      utilizationRate: 56.25
    },
    {
      id: "BUD002",
      projectId: "PRJ001",
      projectName: "Campus WiFi Upgrade",
      category: "Installation",
      budgetedAmount: 50000,
      spentAmount: 25000,
      remainingAmount: 25000,
      utilizationRate: 50
    },
    {
      id: "BUD003",
      projectId: "PRJ002",
      projectName: "AI Research Initiative",
      category: "Personnel",
      budgetedAmount: 150000,
      spentAmount: 120000,
      remainingAmount: 30000,
      utilizationRate: 80
    }
  ]

  const filteredProjects = projects.filter(project =>
    (selectedStatus === "all" || project.status === selectedStatus) &&
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.manager.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return <Badge variant="outline">Planning</Badge>
      case "active":
        return <Badge variant="default">Active</Badge>
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case "on_hold":
        return <Badge variant="secondary">On Hold</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
    }
  }

  const getExpenseStatusBadge = (status: ProjectExpense["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "paid":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
    }
  }

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "research":
        return <TrendingUp className="h-4 w-4" />
      case "infrastructure":
        return <Briefcase className="h-4 w-4" />
      case "academic":
        return <Users className="h-4 w-4" />
      case "administrative":
        return <Clock className="h-4 w-4" />
    }
  }

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === "active").length
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0)
  const totalRemaining = projects.reduce((sum, project) => sum + project.remaining, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Accounts</h1>
          <p className="text-muted-foreground">Manage project budgets, expenses, and financial tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddProject(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">{activeProjects} currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Allocated across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-orange-600">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRemaining.toLocaleString()}</div>
            <p className="text-xs text-green-600">Available for allocation</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budgets">Budget Tracking</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Monitor project status, budgets, and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex items-center flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Spent</TableHead>
                    <TableHead className="text-right">Remaining</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">{project.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{project.manager}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(project.category)}
                          <span className="capitalize">{project.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${project.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={project.remaining < project.budget * 0.1 ? "text-red-600" : "text-green-600"}>
                          ${project.remaining.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-16" />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Project Expenses</CardTitle>
                  <CardDescription>Track and approve project expenditures</CardDescription>
                </div>
                <Button onClick={() => setShowExpenseDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.projectName}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell className="capitalize">{expense.category}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{getExpenseStatusBadge(expense.status)}</TableCell>
                      <TableCell>{expense.approvedBy || "-"}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {expense.status === "pending" ? "Approve" : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tracking Tab */}
        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Utilization</CardTitle>
              <CardDescription>Monitor budget allocation and spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Budgeted</TableHead>
                    <TableHead className="text-right">Spent</TableHead>
                    <TableHead className="text-right">Remaining</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgets.map((budget) => (
                    <TableRow key={budget.id}>
                      <TableCell>{budget.projectName}</TableCell>
                      <TableCell>{budget.category}</TableCell>
                      <TableCell className="text-right">${budget.budgetedAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${budget.spentAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${budget.remainingAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={budget.utilizationRate} className="w-16" />
                          <span className="text-sm">{budget.utilizationRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {budget.utilizationRate > 90 ? (
                          <Badge variant="destructive">High Usage</Badge>
                        ) : budget.utilizationRate > 70 ? (
                          <Badge variant="secondary">Moderate</Badge>
                        ) : (
                          <Badge variant="default">On Track</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Project Dialog */}
      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">Project Name</Label>
              <Input id="projectName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manager" className="text-right">Manager</Label>
              <Input id="manager" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">Budget</Label>
              <Input id="budget" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddProject(false)}>Cancel</Button>
            <Button onClick={() => setShowAddProject(false)}>Create Project</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project Expense</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right">Project</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input id="amount" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vendor" className="text-right">Vendor</Label>
              <Input id="vendor" className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExpenseDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowExpenseDialog(false)}>Add Expense</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
