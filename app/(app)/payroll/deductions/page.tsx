"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DeductionsPage() {
  const deductionsData = {
    paye: [
      { employeeId: "EMP001", name: "John Doe", grossSalary: 5000.00, taxableAmount: 4500.00, taxRate: "20%", deduction: 900.00 },
      { employeeId: "EMP002", name: "Jane Smith", grossSalary: 4500.00, taxableAmount: 4000.00, taxRate: "20%", deduction: 800.00 },
      { employeeId: "EMP003", name: "Mike Johnson", grossSalary: 3800.00, taxableAmount: 3300.00, taxRate: "15%", deduction: 495.00 },
    ],
    rssb: [
      { employeeId: "EMP001", name: "John Doe", grossSalary: 5000.00, pensionBase: 5000.00, rate: "3%", employeeContribution: 150.00, employerContribution: 150.00 },
      { employeeId: "EMP002", name: "Jane Smith", grossSalary: 4500.00, pensionBase: 4500.00, rate: "3%", employeeContribution: 135.00, employerContribution: 135.00 },
      { employeeId: "EMP003", name: "Mike Johnson", grossSalary: 3800.00, pensionBase: 3800.00, rate: "3%", employeeContribution: 114.00, employerContribution: 114.00 },
    ],
    medical: [
      { employeeId: "EMP001", name: "John Doe", grossSalary: 5000.00, basis: "Basic", premium: 150.00, coverage: "Family" },
      { employeeId: "EMP002", name: "Jane Smith", grossSalary: 4500.00, basis: "Basic", premium: 150.00, coverage: "Individual" },
      { employeeId: "EMP003", name: "Mike Johnson", grossSalary: 3800.00, basis: "Basic", premium: 150.00, coverage: "Family" },
    ]
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PAYE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,195.00</div>
            <p className="text-xs text-muted-foreground">For current month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSSB Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$798.00</div>
            <p className="text-xs text-muted-foreground">Total (Employee + Employer)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$450.00</div>
            <p className="text-xs text-muted-foreground">Total premiums</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statutory Deductions</CardTitle>
          <CardDescription>
            Manage and view all statutory deductions including PAYE, RSSB, and Medical Insurance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paye" className="space-y-4">
            <TabsList>
              <TabsTrigger value="paye">PAYE Tax</TabsTrigger>
              <TabsTrigger value="rssb">RSSB Pension</TabsTrigger>
              <TabsTrigger value="medical">Medical Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="paye">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gross Salary</TableHead>
                    <TableHead>Taxable Amount</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead>Deduction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductionsData.paye.map((item) => (
                    <TableRow key={item.employeeId}>
                      <TableCell>{item.employeeId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.grossSalary.toFixed(2)}</TableCell>
                      <TableCell>${item.taxableAmount.toFixed(2)}</TableCell>
                      <TableCell>{item.taxRate}</TableCell>
                      <TableCell>${item.deduction.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="rssb">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Pension Base</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Employee Contribution</TableHead>
                    <TableHead>Employer Contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductionsData.rssb.map((item) => (
                    <TableRow key={item.employeeId}>
                      <TableCell>{item.employeeId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.pensionBase.toFixed(2)}</TableCell>
                      <TableCell>{item.rate}</TableCell>
                      <TableCell>${item.employeeContribution.toFixed(2)}</TableCell>
                      <TableCell>${item.employerContribution.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="medical">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Plan Type</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Monthly Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductionsData.medical.map((item) => (
                    <TableRow key={item.employeeId}>
                      <TableCell>{item.employeeId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.basis}</TableCell>
                      <TableCell>{item.coverage}</TableCell>
                      <TableCell>${item.premium.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline">Download Report</Button>
            <Button>Process Deductions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
