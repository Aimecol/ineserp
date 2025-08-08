"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  PieChart, 
  BarChart3, 
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ExternalLink,
  ArrowRight
} from "lucide-react"

interface DrilldownReport {
  id: string
  title: string
  description: string
  category: "financial" | "academic" | "operational" | "compliance"
  lastUpdated: string
  status: "current" | "outdated" | "pending"
  icon: React.ReactNode
  metrics?: {
    label: string
    value: string
    trend?: "up" | "down" | "stable"
  }[]
}

export function DrilldownReports() {
  // Mock data - replace with real data from your API
  const reports: DrilldownReport[] = [
    {
      id: "1",
      title: "Financial Performance",
      description: "Detailed analysis of revenue, expenses, and profitability",
      category: "financial",
      lastUpdated: "2024-01-15",
      status: "current",
      icon: <DollarSign className="h-4 w-4" />,
      metrics: [
        { label: "Revenue", value: "$2.45M", trend: "up" },
        { label: "Expenses", value: "$1.89M", trend: "down" },
        { label: "Net Income", value: "$560K", trend: "up" }
      ]
    },
    {
      id: "2", 
      title: "Student Enrollment",
      description: "Enrollment trends and demographic analysis",
      category: "academic",
      lastUpdated: "2024-01-14",
      status: "current",
      icon: <Users className="h-4 w-4" />,
      metrics: [
        { label: "Total Students", value: "1,250", trend: "up" },
        { label: "New Admissions", value: "185", trend: "up" },
        { label: "Retention Rate", value: "94.2%", trend: "stable" }
      ]
    },
    {
      id: "3",
      title: "Budget Utilization",
      description: "Department-wise budget allocation and spending",
      category: "financial", 
      lastUpdated: "2024-01-13",
      status: "current",
      icon: <PieChart className="h-4 w-4" />,
      metrics: [
        { label: "Utilized", value: "77.2%", trend: "up" },
        { label: "Remaining", value: "$560K", trend: "down" },
        { label: "Overruns", value: "2 Depts", trend: "stable" }
      ]
    },
    {
      id: "4",
      title: "Operational Efficiency",
      description: "Key operational metrics and performance indicators",
      category: "operational",
      lastUpdated: "2024-01-12",
      status: "outdated",
      icon: <BarChart3 className="h-4 w-4" />,
      metrics: [
        { label: "Faculty Ratio", value: "1:14.7", trend: "stable" },
        { label: "Facility Usage", value: "82%", trend: "up" },
        { label: "IT Uptime", value: "99.8%", trend: "stable" }
      ]
    },
    {
      id: "5",
      title: "Compliance Status",
      description: "Regulatory compliance and audit findings",
      category: "compliance",
      lastUpdated: "2024-01-10",
      status: "pending",
      icon: <FileText className="h-4 w-4" />,
      metrics: [
        { label: "Compliance Score", value: "96%", trend: "up" },
        { label: "Open Issues", value: "3", trend: "down" },
        { label: "Next Audit", value: "Feb 15", trend: "stable" }
      ]
    },
    {
      id: "6",
      title: "Revenue Trends",
      description: "Monthly and quarterly revenue analysis",
      category: "financial",
      lastUpdated: "2024-01-15",
      status: "current",
      icon: <TrendingUp className="h-4 w-4" />,
      metrics: [
        { label: "Monthly Growth", value: "12.5%", trend: "up" },
        { label: "YoY Growth", value: "18.3%", trend: "up" },
        { label: "Forecast", value: "$3.2M", trend: "up" }
      ]
    }
  ]

  const getCategoryColor = (category: DrilldownReport["category"]) => {
    switch (category) {
      case "financial":
        return "bg-green-100 text-green-800"
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "operational":
        return "bg-purple-100 text-purple-800"
      case "compliance":
        return "bg-orange-100 text-orange-800"
    }
  }

  const getStatusBadge = (status: DrilldownReport["status"]) => {
    switch (status) {
      case "current":
        return <Badge variant="default" className="bg-green-100 text-green-800">Current</Badge>
      case "outdated":
        return <Badge variant="secondary">Outdated</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      case "stable":
        return <ArrowRight className="h-3 w-3 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Drill-down Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  {report.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{report.title}</h4>
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Updated: {new Date(report.lastUpdated).toLocaleDateString()}
                    {getStatusBadge(report.status)}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            
            {report.metrics && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                {report.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-medium">{metric.value}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full">
            View All Reports
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
