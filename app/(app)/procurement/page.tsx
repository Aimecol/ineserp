"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { ProcurementForm } from "@/components/forms/procurement-form"

export default function ProcurementPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <PageWrapper
        title="Procurement"
        actionLabel="New Purchase Order"
        onActionClick={() => setShowForm(true)}
        rows={[
          { id: "PO-2025-001", name: "Laboratory Equipment", amount: "$28,400.00", status: "Pending" },
          { id: "PO-2025-002", name: "Office Supplies Q3", amount: "$5,150.00", status: "Paid" },
          { id: "PO-2025-003", name: "IT Infrastructure Upgrade", amount: "$43,700.00", status: "Pending" },
          { id: "PO-2025-004", name: "Maintenance Supplies", amount: "$12,300.00", status: "Overdue" },
          { id: "PO-2025-005", name: "Software Licenses", amount: "$18,900.00", status: "Paid" },
        ]}
      />
      <ProcurementForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}
