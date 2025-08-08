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
import { Download, Calendar, Search, Filter, FileText, ArrowUpDown } from "lucide-react"

interface LedgerEntry {
  date: string
  reference: string
  description: string
  debit: number
  credit: number
  balance: number
  type: "payment" | "receipt" | "journal" | "transfer"
}

interface AccountLedger {
  accountCode: string
  accountName: string
  type: "asset" | "liability" | "equity" | "revenue" | "expense"
  openingBalance: number
  entries: LedgerEntry[]
}

const ledgerData: AccountLedger[] = [
  {
    accountCode: "1010",
    accountName: "Cash in Bank",
    type: "asset",
    openingBalance: 200000.00,
    entries: [
      {
        date: "2025-08-01",
        reference: "REC-001",
        description: "Student Fee Collection",
        debit: 50000.00,
        credit: 0.00,
        balance: 250000.00,
        type: "receipt"
      },
      {
        date: "2025-08-02",
        reference: "PAY-001",
        description: "Utility Payment",
        debit: 0.00,
        credit: 5000.00,
        balance: 245000.00,
        type: "payment"
      },
      {
        date: "2025-08-03",
        reference: "TRF-001",
        description: "Transfer to Petty Cash",
        debit: 0.00,
        credit: 10000.00,
        balance: 235000.00,
        type: "transfer"
      }
    ]
  },
  {
    accountCode: "4010",
    accountName: "Student Fees",
    type: "revenue",
    openingBalance: 450000.00,
    entries: [
      {
        date: "2025-08-01",
        reference: "REC-001",
        description: "Student Fee Collection",
        debit: 0.00,
        credit: 50000.00,
        balance: 500000.00,
        type: "receipt"
      }
    ]
  },
  {
    accountCode: "5010",
    accountName: "Utilities Expense",
    type: "expense",
    openingBalance: 35000.00,
    entries: [
      {
        date: "2025-08-02",
        reference: "PAY-001",
        description: "Utility Payment",
        debit: 5000.00,
        credit: 0.00,
        balance: 40000.00,
        type: "payment"
      }
    ]
  }
]

export default function GeneralLedgerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({ from: "2025-08-01", to: "2025-08-31" })

  const selectedLedger = selectedAccount 
    ? ledgerData.find(ledger => ledger.accountCode === selectedAccount)
    : ledgerData[0]

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">General Ledger</h1>
          <p className="text-muted-foreground">
            Transaction details for all accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Account Selection */}
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
          </div>
        </CardContent>
      </Card>

      {/* Account List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Chart of Accounts</CardTitle>
            <CardDescription>Select an account to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ledgerData
                .filter(account => 
                  account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  account.accountCode.includes(searchTerm)
                )
                .map((account) => (
                  <Button
                    key={account.accountCode}
                    variant={selectedAccount === account.accountCode ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedAccount(account.accountCode)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col items-start">
                        <span>{account.accountName}</span>
                        <span className="text-xs text-muted-foreground">
                          {account.accountCode}
                        </span>
                      </div>
                      <Badge variant={
                        account.type === "asset" ? "default" :
                        account.type === "liability" ? "secondary" :
                        account.type === "revenue" ? "outline" :
                        "destructive"
                      }>
                        {account.type}
                      </Badge>
                    </div>
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Ledger Details */}
        <Card className="md:col-span-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedLedger?.accountName}</CardTitle>
                <CardDescription>Account Code: {selectedLedger?.accountCode}</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Journal Entries
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedLedger && (
              <>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Opening Balance</p>
                    <p className="text-lg font-semibold">
                      ${selectedLedger.openingBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-lg font-semibold">
                      ${(selectedLedger.entries.length > 0 
                        ? selectedLedger.entries[selectedLedger.entries.length - 1].balance 
                        : selectedLedger.openingBalance).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Total Entries</p>
                    <p className="text-lg font-semibold">{selectedLedger.entries.length}</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Debit</TableHead>
                      <TableHead className="text-right">Credit</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5}>Opening Balance</TableCell>
                      <TableCell className="text-right font-medium">
                        ${selectedLedger.openingBalance.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {selectedLedger.entries.map((entry, index) => (
                      <TableRow key={entry.reference}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {entry.reference}
                            <Badge variant={
                              entry.type === "receipt" ? "default" :
                              entry.type === "payment" ? "destructive" :
                              entry.type === "transfer" ? "secondary" : "outline"
                            }>
                              {entry.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell className="text-right">
                          {entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${entry.balance.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
