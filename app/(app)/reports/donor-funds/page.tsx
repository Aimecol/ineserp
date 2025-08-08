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
import { Download, Calendar, PieChart, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DonorFund {
  id: string
  donorName: string
  fundName: string
  totalAmount: number
  utilized: number
  remaining: number
  utilizationRate: number
  allocatedProjects: {
    name: string
    amount: number
    status: "ongoing" | "completed" | "planned"
    utilizationPercent: number
  }[]
  startDate: string
  endDate: string
  category: "infrastructure" | "academic" | "research" | "scholarship"
  status: "active" | "completed" | "pending"
}

const donorData: DonorFund[] = [
  {
    id: "DNR001",
    donorName: "Smith Foundation",
    fundName: "Academic Excellence Fund",
    totalAmount: 1000000.00,
    utilized: 600000.00,
    remaining: 400000.00,
    utilizationRate: 60,
    category: "academic",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    allocatedProjects: [
      {
        name: "Digital Library Enhancement",
        amount: 400000.00,
        status: "ongoing",
        utilizationPercent: 75
      },
      {
        name: "Faculty Development Program",
        amount: 200000.00,
        status: "ongoing",
        utilizationPercent: 45
      },
      {
        name: "Student Research Grants",
        amount: 400000.00,
        status: "planned",
        utilizationPercent: 0
      }
    ]
  },
  {
    id: "DNR002",
    donorName: "Tech Innovation Corp",
    fundName: "Research Innovation Grant",
    totalAmount: 750000.00,
    utilized: 500000.00,
    remaining: 250000.00,
    utilizationRate: 66.67,
    category: "research",
    status: "active",
    startDate: "2025-03-15",
    endDate: "2026-03-14",
    allocatedProjects: [
      {
        name: "AI Research Lab",
        amount: 300000.00,
        status: "ongoing",
        utilizationPercent: 80
      },
      {
        name: "Biotech Research Project",
        amount: 450000.00,
        status: "ongoing",
        utilizationPercent: 55
      }
    ]
  },
  {
    id: "DNR003",
    donorName: "Community Education Trust",
    fundName: "Student Support Fund",
    totalAmount: 500000.00,
    utilized: 500000.00,
    remaining: 0.00,
    utilizationRate: 100,
    category: "scholarship",
    status: "completed",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    allocatedProjects: [
      {
        name: "Merit Scholarships 2025",
        amount: 300000.00,
        status: "completed",
        utilizationPercent: 100
      },
      {
        name: "Need-based Financial Aid",
        amount: 200000.00,
        status: "completed",
        utilizationPercent: 100
      }
    ]
  },
  {
    id: "DNR004",
    donorName: "Infrastructure Development Group",
    fundName: "Campus Modernization Fund",
    totalAmount: 2000000.00,
    utilized: 800000.00,
    remaining: 1200000.00,
    utilizationRate: 40,
    category: "infrastructure",
    status: "active",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    allocatedProjects: [
      {
        name: "Smart Classroom Initiative",
        amount: 800000.00,
        status: "ongoing",
        utilizationPercent: 65
      },
      {
        name: "Green Campus Project",
        amount: 700000.00,
        status: "planned",
        utilizationPercent: 0
      },
      {
        name: "Laboratory Modernization",
        amount: 500000.00,
        status: "planned",
        utilizationPercent: 0
      }
    ]
  }
]

export default function DonorFundPage() {
  const [fundStatus, setFundStatus] = useState<"all" | "active" | "completed" | "pending">("all")
  
  const totalFunds = donorData.reduce((sum, fund) => sum + fund.totalAmount, 0)
  const totalUtilized = donorData.reduce((sum, fund) => sum + fund.utilized, 0)
  const totalRemaining = donorData.reduce((sum, fund) => sum + fund.remaining, 0)
  const overallUtilization = (totalUtilized / totalFunds) * 100

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Donor Fund Utilization</h1>
          <p className="text-muted-foreground">
            Tracking and monitoring of donor funds and their utilization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Funds
          </Button>
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
            <CardTitle className="text-sm font-medium">Total Donor Funds</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalFunds.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {donorData.length} donors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilized Amount</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalUtilized.toLocaleString()}
            </div>
            <Progress value={overallUtilization} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Funds</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRemaining.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalRemaining/totalFunds) * 100).toFixed(1)}% of total funds
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Utilization</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallUtilization.toFixed(1)}%
            </div>
            <Progress value={overallUtilization} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Donor Funds Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Fund Details</CardTitle>
              <CardDescription>Detailed view of all donor funds and their utilization</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={fundStatus === "all" ? "default" : "outline"} 
                      onClick={() => setFundStatus("all")}>
                All Funds
              </Button>
              <Button variant={fundStatus === "active" ? "default" : "outline"}
                      onClick={() => setFundStatus("active")}>
                Active
              </Button>
              <Button variant={fundStatus === "completed" ? "default" : "outline"}
                      onClick={() => setFundStatus("completed")}>
                Completed
              </Button>
              <Button variant={fundStatus === "pending" ? "default" : "outline"}
                      onClick={() => setFundStatus("pending")}>
                Pending
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fund Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Utilized</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donorData.map((fund) => (
                <TableRow key={fund.id}>
                  <TableCell>
                    <div className="font-medium">{fund.fundName}</div>
                    <div className="text-sm text-muted-foreground">{fund.donorName}</div>
                    <div className="text-xs text-muted-foreground">{fund.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {fund.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${fund.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${fund.utilized.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${fund.remaining.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={fund.utilizationRate} />
                      <span className="text-sm">{fund.utilizationRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      fund.status === "active" ? "default" :
                      fund.status === "completed" ? "secondary" :
                      "outline"
                    }>
                      {fund.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(fund.startDate).toLocaleDateString()} -
                      <br />
                      {new Date(fund.endDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Project Allocations */}
      <Card>
        <CardHeader>
          <CardTitle>Project Allocations</CardTitle>
          <CardDescription>Breakdown of fund allocation across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fund</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Allocated Amount</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donorData.flatMap(fund => 
                fund.allocatedProjects.map((project, index) => (
                  <TableRow key={`${fund.id}-${index}`}>
                    <TableCell className="font-medium">{fund.fundName}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell className="text-right">
                      ${project.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.utilizationPercent} />
                        <span className="text-sm">{project.utilizationPercent}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        project.status === "completed" ? "secondary" :
                        project.status === "ongoing" ? "default" :
                        "outline"
                      }>
                        {project.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
