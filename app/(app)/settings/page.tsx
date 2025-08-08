"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Settings,
  Building,
  Users,
  Mail,
  Shield,
  Database,
  Bell,
  Palette,
  Globe,
  DollarSign,
  Calendar,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Download
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddDepartment, setShowAddDepartment] = useState(false)

  // Mock data for settings
  const [institutionSettings, setInstitutionSettings] = useState({
    name: "Springfield University",
    address: "123 Education Street, Springfield, ST 12345",
    phone: "+1 (555) 123-4567",
    email: "admin@springfield.edu",
    website: "https://www.springfield.edu",
    taxId: "12-3456789",
    fiscalYearStart: "July",
    currency: "USD",
    timezone: "America/New_York",
    logo: null
  })

  const [users, setUsers] = useState([
    { id: "1", name: "John Admin", email: "john@springfield.edu", role: "Administrator", status: "Active", lastLogin: "2024-01-15" },
    { id: "2", name: "Sarah Finance", email: "sarah@springfield.edu", role: "Finance Manager", status: "Active", lastLogin: "2024-01-14" },
    { id: "3", name: "Mike HR", email: "mike@springfield.edu", role: "HR Manager", status: "Active", lastLogin: "2024-01-13" },
    { id: "4", name: "Emily Student", email: "emily@springfield.edu", role: "Student Services", status: "Inactive", lastLogin: "2024-01-10" }
  ])

  const [departments, setDepartments] = useState([
    { id: "1", name: "Computer Science", code: "CS", head: "Dr. Smith", budget: 250000, employees: 15 },
    { id: "2", name: "Mathematics", code: "MATH", head: "Dr. Johnson", budget: 180000, employees: 12 },
    { id: "3", name: "Administration", code: "ADMIN", head: "Ms. Wilson", budget: 120000, employees: 8 },
    { id: "4", name: "Finance", code: "FIN", head: "Mr. Brown", budget: 95000, employees: 6 }
  ])

  const [emailSettings, setEmailSettings] = useState({
    provider: "smtp",
    smtpHost: "smtp.springfield.edu",
    smtpPort: "587",
    smtpUser: "noreply@springfield.edu",
    smtpPassword: "••••••••",
    fromName: "Springfield University",
    fromEmail: "noreply@springfield.edu"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    payrollReminders: true,
    budgetAlerts: true,
    systemMaintenance: true,
    securityAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,
    accountLockout: 15
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: 30,
    cloudBackup: true,
    lastBackup: "2024-01-15 02:00:00"
  })

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`)
    // Here you would typically make an API call to save the settings
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Institution Information
                </CardTitle>
                <CardDescription>Basic information about your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    value={institutionSettings.name}
                    onChange={(e) => setInstitutionSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={institutionSettings.address}
                    onChange={(e) => setInstitutionSettings(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={institutionSettings.phone}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={institutionSettings.email}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={institutionSettings.website}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={institutionSettings.taxId}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, taxId: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Institution Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input id="logo" type="file" accept="image/*" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  System Configuration
                </CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                  <Select value={institutionSettings.fiscalYearStart} onValueChange={(value) => setInstitutionSettings(prev => ({ ...prev, fiscalYearStart: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={institutionSettings.currency} onValueChange={(value) => setInstitutionSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={institutionSettings.timezone} onValueChange={(value) => setInstitutionSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('general')}>
                    <Save className="h-4 w-4 mr-2" />
                    Save General Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users & Roles Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button onClick={() => setShowAddUser(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure permissions for each role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Administrator</Label>
                  <div className="text-sm text-muted-foreground">Full system access</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">All Modules</Badge>
                    <Badge variant="outline">User Management</Badge>
                    <Badge variant="outline">System Settings</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Finance Manager</Label>
                  <div className="text-sm text-muted-foreground">Financial operations access</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">Payroll</Badge>
                    <Badge variant="outline">Procurement</Badge>
                    <Badge variant="outline">Reports</Badge>
                    <Badge variant="outline">Fixed Assets</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>HR Manager</Label>
                  <div className="text-sm text-muted-foreground">Human resources access</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">Payroll</Badge>
                    <Badge variant="outline">Employee Records</Badge>
                    <Badge variant="outline">Leave Management</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Active user sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">John Admin</div>
                      <div className="text-sm text-muted-foreground">192.168.1.100</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Active</div>
                      <div className="text-xs text-muted-foreground">2h 15m</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">Sarah Finance</div>
                      <div className="text-sm text-muted-foreground">192.168.1.105</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Active</div>
                      <div className="text-xs text-muted-foreground">45m</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Department Management
                  </CardTitle>
                  <CardDescription>Manage organizational departments and budgets</CardDescription>
                </div>
                <Button onClick={() => setShowAddDepartment(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.code}</TableCell>
                      <TableCell>{dept.head}</TableCell>
                      <TableCell>${dept.budget.toLocaleString()}</TableCell>
                      <TableCell>{dept.employees}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${departments.reduce((sum, dept) => sum + dept.budget, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Across all departments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {departments.reduce((sum, dept) => sum + dept.employees, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Active employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{departments.length}</div>
                <p className="text-xs text-muted-foreground">Active departments</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  SMTP Configuration
                </CardTitle>
                <CardDescription>Configure email server settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Email Provider</Label>
                  <Select value={emailSettings.provider} onValueChange={(value) => setEmailSettings(prev => ({ ...prev, provider: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">Custom SMTP</SelectItem>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Customize email templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Welcome Email</div>
                      <div className="text-sm text-muted-foreground">New user registration</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Password Reset</div>
                      <div className="text-sm text-muted-foreground">Password recovery</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Payroll Notification</div>
                      <div className="text-sm text-muted-foreground">Monthly payroll alerts</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Separator />
                <Button onClick={() => handleSaveSettings('email')} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <div className="text-sm text-muted-foreground">Receive notifications via SMS</div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">Browser push notifications</div>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Types</CardTitle>
                <CardDescription>Choose which alerts to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payroll Reminders</Label>
                    <div className="text-sm text-muted-foreground">Monthly payroll processing alerts</div>
                  </div>
                  <Switch
                    checked={notificationSettings.payrollReminders}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, payrollReminders: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Budget Alerts</Label>
                    <div className="text-sm text-muted-foreground">Budget threshold warnings</div>
                  </div>
                  <Switch
                    checked={notificationSettings.budgetAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, budgetAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Maintenance</Label>
                    <div className="text-sm text-muted-foreground">Scheduled maintenance notifications</div>
                  </div>
                  <Switch
                    checked={notificationSettings.systemMaintenance}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, systemMaintenance: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <div className="text-sm text-muted-foreground">Security-related notifications</div>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, securityAlerts: checked }))}
                  />
                </div>
                <Separator />
                <Button onClick={() => handleSaveSettings('notifications')} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Password Policy
                </CardTitle>
                <CardDescription>Configure password requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordLength">Minimum Password Length</Label>
                  <Input
                    id="passwordLength"
                    type="number"
                    min="6"
                    max="20"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Special Characters</Label>
                    <div className="text-sm text-muted-foreground">Include symbols (!@#$%)</div>
                  </div>
                  <Switch
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Numbers</Label>
                    <div className="text-sm text-muted-foreground">Include numeric characters</div>
                  </div>
                  <Switch
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireNumbers: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <div className="text-sm text-muted-foreground">Require 2FA for all users</div>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session & Access Control</CardTitle>
                <CardDescription>Configure session and login settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    min="3"
                    max="10"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountLockout">Account Lockout Duration (minutes)</Label>
                  <Input
                    id="accountLockout"
                    type="number"
                    min="5"
                    max="60"
                    value={securitySettings.accountLockout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, accountLockout: Number(e.target.value) }))}
                  />
                </div>
                <Separator />
                <Button onClick={() => handleSaveSettings('security')} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Backup Configuration
                </CardTitle>
                <CardDescription>Configure automatic backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backup</Label>
                    <div className="text-sm text-muted-foreground">Enable scheduled backups</div>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={backupSettings.backupFrequency} onValueChange={(value) => setBackupSettings(prev => ({ ...prev, backupFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Backup Time</Label>
                  <Input
                    id="backupTime"
                    type="time"
                    value={backupSettings.backupTime}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, backupTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">Retention Period (days)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    min="1"
                    max="365"
                    value={backupSettings.retentionDays}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, retentionDays: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cloud Backup</Label>
                    <div className="text-sm text-muted-foreground">Store backups in cloud</div>
                  </div>
                  <Switch
                    checked={backupSettings.cloudBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, cloudBackup: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
                <CardDescription>Current backup information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <div className="text-sm">{backupSettings.lastBackup}</div>
                </div>
                <div className="space-y-2">
                  <Label>Backup Status</Label>
                  <Badge variant="default">Successful</Badge>
                </div>
                <div className="space-y-2">
                  <Label>Next Scheduled Backup</Label>
                  <div className="text-sm">Today at 02:00 AM</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Create Manual Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
                <Separator />
                <Button onClick={() => handleSaveSettings('backup')} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Backup Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userName" className="text-right">Name</Label>
              <Input id="userName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userEmail" className="text-right">Email</Label>
              <Input id="userEmail" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userRole" className="text-right">Role</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="finance">Finance Manager</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                  <SelectItem value="student">Student Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
            <Button onClick={() => setShowAddUser(false)}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Department Dialog */}
      <Dialog open={showAddDepartment} onOpenChange={setShowAddDepartment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deptName" className="text-right">Name</Label>
              <Input id="deptName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deptCode" className="text-right">Code</Label>
              <Input id="deptCode" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deptHead" className="text-right">Department Head</Label>
              <Input id="deptHead" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deptBudget" className="text-right">Budget</Label>
              <Input id="deptBudget" type="number" className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDepartment(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDepartment(false)}>Add Department</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
