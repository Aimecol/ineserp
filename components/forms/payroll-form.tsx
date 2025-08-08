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
import { 
  CalendarIcon, 
  Plus, 
  Trash2, 
  Calculator,
  Users,
  DollarSign,
  Clock,
  FileText
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PayrollFormProps {
  open: boolean
  onClose: () => void
}

interface Employee {
  id: string
  name: string
  position: string
  department: string
  baseSalary: number
  selected: boolean
}

interface PayrollItem {
  employeeId: string
  employeeName: string
  baseSalary: number
  overtime: number
  bonuses: number
  deductions: number
  netPay: number
}

export function PayrollForm({ open, onClose }: PayrollFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [payrollDate, setPayrollDate] = useState<Date>()
  const [payPeriodStart, setPayPeriodStart] = useState<Date>()
  const [payPeriodEnd, setPayPeriodEnd] = useState<Date>()
  const [payrollType, setPayrollType] = useState("")
  const [department, setDepartment] = useState("")
  const [description, setDescription] = useState("")
  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([])

  // Mock employee data
  const employees: Employee[] = [
    {
      id: "EMP001",
      name: "John Smith",
      position: "Professor",
      department: "Computer Science",
      baseSalary: 5500,
      selected: false
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      position: "Associate Professor",
      department: "Mathematics",
      baseSalary: 4800,
      selected: false
    },
    {
      id: "EMP003",
      name: "Mike Wilson",
      position: "Administrative Assistant",
      department: "Administration",
      baseSalary: 3200,
      selected: false
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      position: "Lab Technician",
      department: "Computer Science",
      baseSalary: 3800,
      selected: false
    }
  ]

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>(employees)

  const handleEmployeeSelection = (employeeId: string, selected: boolean) => {
    setSelectedEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId ? { ...emp, selected } : emp
      )
    )
  }

  const addPayrollItem = (employee: Employee) => {
    const newItem: PayrollItem = {
      employeeId: employee.id,
      employeeName: employee.name,
      baseSalary: employee.baseSalary,
      overtime: 0,
      bonuses: 0,
      deductions: 0,
      netPay: employee.baseSalary
    }
    setPayrollItems(prev => [...prev, newItem])
  }

  const updatePayrollItem = (employeeId: string, field: keyof PayrollItem, value: number) => {
    setPayrollItems(prev => 
      prev.map(item => {
        if (item.employeeId === employeeId) {
          const updated = { ...item, [field]: value }
          // Recalculate net pay
          updated.netPay = updated.baseSalary + updated.overtime + updated.bonuses - updated.deductions
          return updated
        }
        return item
      })
    )
  }

  const removePayrollItem = (employeeId: string) => {
    setPayrollItems(prev => prev.filter(item => item.employeeId !== employeeId))
  }

  const calculateTotals = () => {
    return payrollItems.reduce((totals, item) => ({
      baseSalary: totals.baseSalary + item.baseSalary,
      overtime: totals.overtime + item.overtime,
      bonuses: totals.bonuses + item.bonuses,
      deductions: totals.deductions + item.deductions,
      netPay: totals.netPay + item.netPay
    }), { baseSalary: 0, overtime: 0, bonuses: 0, deductions: 0, netPay: 0 })
  }

  const totals = calculateTotals()

  const handleSubmit = () => {
    // Handle form submission
    console.log("Payroll data:", {
      payrollDate,
      payPeriodStart,
      payPeriodEnd,
      payrollType,
      department,
      description,
      payrollItems,
      totals
    })
    onClose()
  }

  const handleReset = () => {
    setPayrollDate(undefined)
    setPayPeriodStart(undefined)
    setPayPeriodEnd(undefined)
    setPayrollType("")
    setDepartment("")
    setDescription("")
    setPayrollItems([])
    setSelectedEmployees(employees.map(emp => ({ ...emp, selected: false })))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Create New Payroll Entry
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="employees">Select Employees</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Payroll Information
                </CardTitle>
                <CardDescription>Enter basic payroll details and pay period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payrollType">Payroll Type *</Label>
                    <Select value={payrollType} onValueChange={setPayrollType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payroll type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Salary</SelectItem>
                        <SelectItem value="bonus">Bonus Payment</SelectItem>
                        <SelectItem value="overtime">Overtime Payment</SelectItem>
                        <SelectItem value="contract">Contract Payment</SelectItem>
                        <SelectItem value="special">Special Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Payroll Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !payrollDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {payrollDate ? format(payrollDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={payrollDate}
                          onSelect={setPayrollDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Pay Period Start *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !payPeriodStart && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {payPeriodStart ? format(payPeriodStart, "PPP") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={payPeriodStart}
                          onSelect={setPayPeriodStart}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Pay Period End *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !payPeriodEnd && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {payPeriodEnd ? format(payPeriodEnd, "PPP") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={payPeriodEnd}
                          onSelect={setPayPeriodEnd}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter payroll description or notes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("employees")}>
                Next: Select Employees
              </Button>
            </div>
          </TabsContent>

          {/* Employee Selection Tab */}
          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Employee Selection
                </CardTitle>
                <CardDescription>Select employees to include in this payroll</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={employee.selected}
                          onChange={(e) => handleEmployeeSelection(employee.id, e.target.checked)}
                          className="rounded"
                        />
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.position} • {employee.department}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${employee.baseSalary.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Base Salary</div>
                      </div>
                      {employee.selected && (
                        <Button
                          size="sm"
                          onClick={() => addPayrollItem(employee)}
                          disabled={payrollItems.some(item => item.employeeId === employee.id)}
                        >
                          {payrollItems.some(item => item.employeeId === employee.id) ? "Added" : "Add to Payroll"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("calculations")}>
                Next: Calculations
              </Button>
            </div>
          </TabsContent>

          {/* Calculations Tab */}
          <TabsContent value="calculations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Payroll Calculations
                </CardTitle>
                <CardDescription>Configure salary components for each employee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollItems.map((item) => (
                    <div key={item.employeeId} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.employeeName}</div>
                          <div className="text-sm text-muted-foreground">Base: ${item.baseSalary.toLocaleString()}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removePayrollItem(item.employeeId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Overtime ($)</Label>
                          <Input
                            type="number"
                            value={item.overtime}
                            onChange={(e) => updatePayrollItem(item.employeeId, "overtime", Number(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Bonuses ($)</Label>
                          <Input
                            type="number"
                            value={item.bonuses}
                            onChange={(e) => updatePayrollItem(item.employeeId, "bonuses", Number(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Deductions ($)</Label>
                          <Input
                            type="number"
                            value={item.deductions}
                            onChange={(e) => updatePayrollItem(item.employeeId, "deductions", Number(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Net Pay</Label>
                          <div className="p-2 bg-muted rounded font-medium">
                            ${item.netPay.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {payrollItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No employees added to payroll. Go back to select employees.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("employees")}>
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
                  <FileText className="h-4 w-4" />
                  Payroll Summary
                </CardTitle>
                <CardDescription>Review payroll details before submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Payroll Type</Label>
                    <div className="text-sm">{payrollType || "Not specified"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Department</Label>
                    <div className="text-sm">{department || "All Departments"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Payroll Date</Label>
                    <div className="text-sm">{payrollDate ? format(payrollDate, "PPP") : "Not set"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Pay Period</Label>
                    <div className="text-sm">
                      {payPeriodStart && payPeriodEnd 
                        ? `${format(payPeriodStart, "MMM dd")} - ${format(payPeriodEnd, "MMM dd, yyyy")}`
                        : "Not set"
                      }
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Payroll Totals</h4>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">${totals.baseSalary.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Base Salary</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">${totals.overtime.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Overtime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${totals.bonuses.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Bonuses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">${totals.deductions.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Deductions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">${totals.netPay.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Net Pay</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Employees ({payrollItems.length})</Label>
                  <div className="space-y-2">
                    {payrollItems.map((item) => (
                      <div key={item.employeeId} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">{item.employeeName}</span>
                        <span className="text-sm font-medium">${item.netPay.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("calculations")}>
                Previous
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset Form
                </Button>
                <Button onClick={handleSubmit}>
                  Create Payroll Entry
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
