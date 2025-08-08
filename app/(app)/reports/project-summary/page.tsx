"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, PieChart, ArrowUpDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProjectFinancials {
  id: string
  name: string
  budget: number
  spent: number
  remaining: number
  progress: number
  status: "on-track" | "at-risk" | "over-budget"
  startDate: string
  endDate: string
  department: string
}

const projectData: ProjectFinancials[] = [
  {
    id: "PRJ001",
    name: "Campus Infrastructure Upgrade",
    budget: 500000.00,
    spent: 350000.00,
    remaining: 150000.00,
    progress: 70,
    status: "on-track",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    department: "Facilities"
  },
  {
    id: "PRJ002",
    name: "Digital Learning Platform",
    budget: 300000.00,
    spent: 275000.00,
    remaining: 25000.00,
    progress: 85,
    status: "at-risk",
    startDate: "2025-03-15",
    endDate: "2025-09-30",
    department: "IT"
  },
  {
    id: "PRJ003",
    name: "Laboratory Equipment Renewal",
    budget: 250000.00,
    spent: 260000.00,
    remaining: -10000.00,
    progress: 95,
    status: "over-budget",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    department: "Science"
  },
  {
    id: "PRJ004",
    name: "Sports Complex Renovation",
    budget: 400000.00,
    spent: 200000.00,
    remaining: 200000.00,
    progress: 45,
    status: "on-track",
    startDate: "2025-05-01",
    endDate: "2026-02-28",
    department: "Athletics"
  }
]

export default function ProjectSummaryPage() {
  const [viewType, setViewType] = useState<"all" | "active" | "completed">("all")
  
  const totalBudget = projectData.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projectData.reduce((sum, project) => sum + project.spent, 0)
  const totalRemaining = projectData.reduce((sum, project) => sum + project.remaining, 0)
  const averageProgress = projectData.reduce((sum, project) => sum + project.progress, 0) / projectData.length

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Project Financial Summary</h1>
          <p className="text-muted-foreground">
            Financial overview of all institutional projects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {projectData.length} projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSpent.toLocaleString()}
            </div>
            <Progress value={(totalSpent/totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRemaining.toLocaleString()}
            </div>
            <p className={`text-xs ${totalRemaining >= 0 ? "text-green-500" : "text-red-500"}`}>
              {((totalRemaining/totalBudget) * 100).toFixed(1)}% of total budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageProgress.toFixed(1)}%
            </div>
            <Progress value={averageProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Financial status of all projects</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={viewType === "all" ? "default" : "outline"} 
                      onClick={() => setViewType("all")}>
                All Projects
              </Button>
              <Button variant={viewType === "active" ? "default" : "outline"}
                      onClick={() => setViewType("active")}>
                Active
              </Button>
              <Button variant={viewType === "completed" ? "default" : "outline"}
                      onClick={() => setViewType("completed")}>
                Completed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {project.name}
                    <div className="text-xs text-muted-foreground">{project.id}</div>
                  </TableCell>
                  <TableCell>{project.department}</TableCell>
                  <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${project.spent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={project.remaining >= 0 ? "text-green-500" : "text-red-500"}>
                      ${project.remaining.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} />
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      project.status === "on-track" ? "default" :
                      project.status === "at-risk" ? "secondary" :
                      "destructive"
                    }>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(project.startDate).toLocaleDateString()} -
                      <br />
                      {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
