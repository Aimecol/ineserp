"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  ExternalLink
} from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  description: string
  dueDate?: string
  priority: "high" | "medium" | "low"
  category: "budget" | "deadline" | "compliance" | "payment"
}

interface Deadline {
  id: string
  title: string
  description: string
  dueDate: string
  status: "upcoming" | "overdue" | "completed"
  category: "report" | "payment" | "compliance" | "review"
}

export function AlertsDeadlines() {
  // Mock data - replace with real data from your API
  const alerts: Alert[] = [
    {
      id: "1",
      type: "error",
      title: "Budget Overrun Alert",
      description: "Research Department has exceeded 95% of allocated budget",
      priority: "high",
      category: "budget"
    },
    {
      id: "2", 
      type: "warning",
      title: "Low Cash Flow",
      description: "Operating account balance below minimum threshold",
      priority: "high",
      category: "payment"
    },
    {
      id: "3",
      type: "info",
      title: "Audit Preparation",
      description: "Annual audit scheduled for next month",
      dueDate: "2024-02-15",
      priority: "medium",
      category: "compliance"
    },
    {
      id: "4",
      type: "warning",
      title: "Pending Invoices",
      description: "12 invoices pending approval for over 30 days",
      priority: "medium",
      category: "payment"
    }
  ]

  const deadlines: Deadline[] = [
    {
      id: "1",
      title: "Monthly Financial Report",
      description: "Submit monthly financial statements to board",
      dueDate: "2024-01-31",
      status: "upcoming",
      category: "report"
    },
    {
      id: "2",
      title: "Payroll Processing",
      description: "Process faculty and staff payroll",
      dueDate: "2024-01-28",
      status: "upcoming", 
      category: "payment"
    },
    {
      id: "3",
      title: "Tax Filing Deadline",
      description: "Submit quarterly tax returns",
      dueDate: "2024-01-25",
      status: "overdue",
      category: "compliance"
    },
    {
      id: "4",
      title: "Budget Review Meeting",
      description: "Quarterly budget review with department heads",
      dueDate: "2024-02-05",
      status: "upcoming",
      category: "review"
    }
  ]

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertBadgeColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
    }
  }

  const getDeadlineIcon = (category: Deadline["category"]) => {
    switch (category) {
      case "report":
        return <FileText className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "compliance":
        return <AlertTriangle className="h-4 w-4" />
      case "review":
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: Deadline["status"]) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default">Upcoming</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
              {getAlertIcon(alert.type)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <Badge variant={getAlertBadgeColor(alert.priority)} className="text-xs">
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Deadlines Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start gap-3 p-3 border rounded-lg">
              {getDeadlineIcon(deadline.category)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{deadline.title}</h4>
                  {getStatusBadge(deadline.status)}
                </div>
                <p className="text-xs text-muted-foreground">{deadline.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Due: {new Date(deadline.dueDate).toLocaleDateString()}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
