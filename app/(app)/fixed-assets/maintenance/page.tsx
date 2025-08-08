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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, Wrench, Shield } from "lucide-react"

interface MaintenanceLog {
  id: string
  assetId: string
  assetName: string
  type: "preventive" | "corrective" | "emergency"
  date: string
  cost: number
  provider: string
  description: string
  nextScheduled?: string
  status: "scheduled" | "in-progress" | "completed"
}

interface InsurancePolicy {
  id: string
  assetId: string
  assetName: string
  provider: string
  policyNumber: string
  coverage: string
  premium: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "pending-renewal"
}

const maintenanceLogs: MaintenanceLog[] = [
  {
    id: "MNT001",
    assetId: "AST003",
    assetName: "HVAC System",
    type: "preventive",
    date: "2025-08-01",
    cost: 500.00,
    provider: "AC Solutions Inc",
    description: "Quarterly maintenance and filter replacement",
    nextScheduled: "2025-11-01",
    status: "completed"
  },
  {
    id: "MNT002",
    assetId: "AST003",
    assetName: "HVAC System",
    type: "corrective",
    date: "2025-08-15",
    cost: 800.00,
    provider: "AC Solutions Inc",
    description: "Compressor repair",
    status: "scheduled"
  },
  {
    id: "MNT003",
    assetId: "AST007",
    assetName: "Generator",
    type: "emergency",
    date: "2025-08-05",
    cost: 1200.00,
    provider: "Power Systems Ltd",
    description: "Emergency repair due to failure",
    status: "in-progress"
  }
]

const insurancePolicies: InsurancePolicy[] = [
  {
    id: "INS001",
    assetId: "AST003",
    assetName: "HVAC System",
    provider: "SafeGuard Insurance",
    policyNumber: "POL-2025-001",
    coverage: "Equipment Breakdown",
    premium: 1200.00,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active"
  },
  {
    id: "INS002",
    assetId: "AST007",
    assetName: "Generator",
    provider: "SecureAsset Insurance",
    policyNumber: "POL-2025-002",
    coverage: "Comprehensive Equipment",
    premium: 800.00,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active"
  },
  {
    id: "INS003",
    assetId: "AST008",
    assetName: "Server Room Equipment",
    provider: "TechInsure Co",
    policyNumber: "POL-2024-003",
    coverage: "Electronic Equipment",
    premium: 2000.00,
    startDate: "2024-07-01",
    endDate: "2025-08-15",
    status: "pending-renewal"
  }
]

export default function MaintenanceInsurancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"maintenance" | "insurance">("maintenance")

  const filteredMaintenance = maintenanceLogs.filter(log =>
    log.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.provider.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInsurance = insurancePolicies.filter(policy =>
    policy.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.provider.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceLogs.filter(m => m.status !== "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${maintenanceLogs.reduce((sum, log) => sum + log.cost, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insurancePolicies.filter(p => p.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Premiums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${insurancePolicies.reduce((sum, policy) => sum + policy.premium, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <Button
          variant={activeTab === "maintenance" ? "default" : "outline"}
          onClick={() => setActiveTab("maintenance")}
        >
          <Wrench className="h-4 w-4 mr-2" />
          Maintenance Logs
        </Button>
        <Button
          variant={activeTab === "insurance" ? "default" : "outline"}
          onClick={() => setActiveTab("insurance")}
        >
          <Shield className="h-4 w-4 mr-2" />
          Insurance Policies
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>
                {activeTab === "maintenance" ? "Maintenance Records" : "Insurance Policies"}
              </CardTitle>
              <CardDescription>
                {activeTab === "maintenance" 
                  ? "Track maintenance activities and schedules"
                  : "Manage asset insurance coverage"}
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {activeTab === "maintenance" ? "Log Maintenance" : "Add Policy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder={`Search ${activeTab === "maintenance" ? "maintenance logs" : "policies"}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {activeTab === "maintenance" ? (
            <div className="space-y-4">
              {filteredMaintenance.map((log) => (
                <Card key={log.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{log.assetName}</CardTitle>
                          <Badge variant={
                            log.type === "emergency" ? "destructive" :
                            log.type === "corrective" ? "secondary" : "default"
                          }>
                            {log.type}
                          </Badge>
                        </div>
                        <CardDescription>ID: {log.id} | Provider: {log.provider}</CardDescription>
                      </div>
                      <Badge variant={
                        log.status === "completed" ? "default" :
                        log.status === "in-progress" ? "secondary" : "outline"
                      }>
                        {log.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{log.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost</p>
                        <p className="font-medium">${log.cost.toLocaleString()}</p>
                      </div>
                      {log.nextScheduled && (
                        <div>
                          <p className="text-sm text-muted-foreground">Next Scheduled</p>
                          <p className="font-medium">{log.nextScheduled}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-2">Description:</p>
                      <p>{log.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInsurance.map((policy) => (
                <Card key={policy.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{policy.assetName}</CardTitle>
                        <CardDescription>
                          Policy: {policy.policyNumber} | Provider: {policy.provider}
                        </CardDescription>
                      </div>
                      <Badge variant={
                        policy.status === "active" ? "default" :
                        policy.status === "pending-renewal" ? "secondary" : "destructive"
                      }>
                        {policy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage Type</p>
                        <p className="font-medium">{policy.coverage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Premium</p>
                        <p className="font-medium">${policy.premium.toLocaleString()}/year</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{policy.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p className="font-medium">{policy.endDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Policy Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
