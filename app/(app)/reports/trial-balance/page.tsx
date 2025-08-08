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
import { Download, Calendar, Search, Filter } from "lucide-react"

interface AccountBalance {
  accountCode: string
  accountName: string
  debit: number
  credit: number
  balance: number
  type: "asset" | "liability" | "equity" | "revenue" | "expense"
}

const trialBalanceData: AccountBalance[] = [
  // Assets
  {
    accountCode: "1010",
    accountName: "Cash in Bank",
    debit: 250000.00,
    credit: 0.00,
    balance: 250000.00,
    type: "asset"
  },
  {
    accountCode: "1020",
    accountName: "Accounts Receivable",
    debit: 150000.00,
    credit: 0.00,
    balance: 150000.00,
    type: "asset"
  },
  {
    accountCode: "1200",
    accountName: "Property and Equipment",
    debit: 800000.00,
    credit: 0.00,
    balance: 800000.00,
    type: "asset"
  },
  // Liabilities
  {
    accountCode: "2010",
    accountName: "Accounts Payable",
    debit: 0.00,
    credit: 80000.00,
    balance: -80000.00,
    type: "liability"
  },
  {
    accountCode: "2020",
    accountName: "Accrued Expenses",
    debit: 0.00,
    credit: 40000.00,
    balance: -40000.00,
    type: "liability"
  },
  // Revenue
  {
    accountCode: "4010",
    accountName: "Student Fees",
    debit: 0.00,
    credit: 500000.00,
    balance: -500000.00,
    type: "revenue"
  },
  {
    accountCode: "4020",
    accountName: "Admission Fees",
    debit: 0.00,
    credit: 75000.00,
    balance: -75000.00,
    type: "revenue"
  },
  // Expenses
  {
    accountCode: "5010",
    accountName: "Salaries Expense",
    debit: 250000.00,
    credit: 0.00,
    balance: 250000.00,
    type: "expense"
  },
  {
    accountCode: "5020",
    accountName: "Utilities Expense",
    debit: 40000.00,
    credit: 0.00,
    balance: 40000.00,
    type: "expense"
  }
]

export default function TrialBalancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const currentDate = "August 8, 2025"

  // Calculate totals
  const totals = trialBalanceData.reduce(
    (acc, curr) => ({
      totalDebit: acc.totalDebit + curr.debit,
      totalCredit: acc.totalCredit + curr.credit,
    }),
    { totalDebit: 0, totalCredit: 0 }
  )

  const filteredData = trialBalanceData.filter(account => 
    (selectedType === "all" || account.type === selectedType) &&
    (account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     account.accountCode.includes(searchTerm))
  )

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Trial Balance</h1>
          <p className="text-muted-foreground">
            As of {currentDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Change Date
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
            <CardTitle className="text-sm font-medium">Total Debit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalDebit.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalCredit.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.abs(totals.totalDebit - totals.totalCredit).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trialBalanceData.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-500 absolute ml-2" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedType === "all" ? "default" : "outline"}
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              <Button 
                variant={selectedType === "asset" ? "default" : "outline"}
                onClick={() => setSelectedType("asset")}
              >
                Assets
              </Button>
              <Button 
                variant={selectedType === "liability" ? "default" : "outline"}
                onClick={() => setSelectedType("liability")}
              >
                Liabilities
              </Button>
              <Button 
                variant={selectedType === "revenue" ? "default" : "outline"}
                onClick={() => setSelectedType("revenue")}
              >
                Revenue
              </Button>
              <Button 
                variant={selectedType === "expense" ? "default" : "outline"}
                onClick={() => setSelectedType("expense")}
              >
                Expenses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trial Balance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trial Balance Details</CardTitle>
          <CardDescription>Review account balances and verify debits equal credits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((account) => (
                <TableRow key={account.accountCode}>
                  <TableCell>{account.accountCode}</TableCell>
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell>
                    <Badge variant={
                      account.type === "asset" ? "default" :
                      account.type === "liability" ? "secondary" :
                      account.type === "revenue" ? "outline" :
                      "destructive"
                    }>
                      {account.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${account.debit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${account.credit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={account.balance >= 0 ? "text-green-500" : "text-red-500"}>
                      ${Math.abs(account.balance).toLocaleString()}
                      {account.balance < 0 ? " Cr" : " Dr"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-muted">
                <TableCell colSpan={3}>Totals</TableCell>
                <TableCell className="text-right">${totals.totalDebit.toLocaleString()}</TableCell>
                <TableCell className="text-right">${totals.totalCredit.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  ${Math.abs(totals.totalDebit - totals.totalCredit).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
