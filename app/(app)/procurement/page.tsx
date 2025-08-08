import { PageWrapper } from "@/components/page-wrapper"

export default function ProcurementPage() {
  return (
    <PageWrapper
      title="Procurement"
      actionLabel="New PO"
      rows={[
        { id: "PC-11001", name: "Lab Equipment", amount: "$8,400.00", status: "Pending" },
        { id: "PC-11002", name: "Uniforms", amount: "$2,150.00", status: "Paid" },
        { id: "PC-11003", name: "Furniture", amount: "$13,700.00", status: "Overdue" },
      ]}
    />
  )
}
