"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

type Row = {
  id: string
  name: string
  amount: string
  status: "Paid" | "Pending" | "Overdue"
}

type PageWrapperProps = {
  title?: string
  actionLabel?: string
  onActionClick?: () => void
  rows?: Row[]
}

const defaultRows: Row[] = [
  { id: "TX-1001", name: "Acme Corp Retainer", amount: "$3,200.00", status: "Paid" },
  { id: "TX-1002", name: "Vendor Invoice", amount: "$1,150.00", status: "Pending" },
  { id: "TX-1003", name: "Office Lease", amount: "$9,800.00", status: "Overdue" },
]

export function PageWrapper({
  title = "Untitled",
  actionLabel = "Add New",
  onActionClick,
  rows = defaultRows,
}: PageWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 8 } : false}
      animate={mounted ? { opacity: 1, y: 0 } : false}
      transition={mounted ? { duration: 0.25 } : false}
      className="px-4 pb-8 pt-4 md:px-6"
    >
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <Button
          onClick={onActionClick}
          className="bg-[#32872e] hover:bg-[#e0d722] hover:text-black text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">ID</TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="min-w-[140px]">Amount</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="hover:bg-[#f0f1f2]">
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }: { status: "Paid" | "Pending" | "Overdue" }) {
  if (status === "Paid") {
    return <Badge className="bg-[#32872e] text-white hover:bg-[#256a24]">Paid</Badge>
  }
  if (status === "Pending") {
    return <Badge className="bg-[#e0d722] text-black hover:bg-[#d5cc20]">Pending</Badge>
  }
  return <Badge className="bg-[#ef4444] text-white hover:bg-[#dc2626]">Overdue</Badge>
}
