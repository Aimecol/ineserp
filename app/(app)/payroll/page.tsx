"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { PayrollForm } from "@/components/forms/payroll-form"

type Row = {
  id: string
  name: string
  amount: string
  status: "Paid" | "Pending" | "Overdue"
}

export default function PayrollPage() {
  const [showForm, setShowForm] = useState(false)
  
  const payrollData: Row[] = [
    { id: "PR-001", name: "January 2025 Payroll", amount: "$45,230.00", status: "Paid" },
    { id: "PR-002", name: "February 2025 Payroll", amount: "$46,150.00", status: "Paid" },
    { id: "PR-003", name: "March 2025 Payroll", amount: "$47,800.00", status: "Pending" },
    { id: "PR-004", name: "Employee Bonuses Q1", amount: "$12,500.00", status: "Pending" },
    { id: "PR-005", name: "Overtime Payments - Q1", amount: "$8,750.00", status: "Pending" },
    { id: "PR-006", name: "Contract Staff - March", amount: "$15,300.00", status: "Paid" },
  ]

  return (
    <>
      <PageWrapper
        title="Payroll Management"
        actionLabel="New Payroll Entry"
        onActionClick={() => setShowForm(true)}
        rows={payrollData}
      />
      <PayrollForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}
