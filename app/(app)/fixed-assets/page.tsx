"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { FixedAssetsForm } from "@/components/forms/fixed-assets-form"

export default function FixedAssetsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <PageWrapper
        title="Fixed Assets"
        actionLabel="Add Asset"
        onActionClick={() => setShowForm(true)}
        rows={[
          { id: "FA-001", name: "Office Building - Main Campus", amount: "$2,500,000.00", status: "Paid" },
          { id: "FA-002", name: "IT Equipment", amount: "$185,000.00", status: "Paid" },
          { id: "FA-003", name: "Vehicles", amount: "$120,000.00", status: "Paid" },
          { id: "FA-004", name: "Laboratory Equipment", amount: "$350,000.00", status: "Pending" },
        ]}
      />
      <FixedAssetsForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}
