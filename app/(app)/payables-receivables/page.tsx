import { PageWrapper } from "@/components/page-wrapper"

export default function PayablesReceivablesPage() {
  return (
    <PageWrapper
      title="Payables / Receivables"
      actionLabel="Add Record"
      rows={[
        { id: "PR-8001", name: "Vendor - CleanCo", amount: "$940.00", status: "Pending" },
        { id: "PR-8002", name: "Parent - Smith", amount: "$650.00", status: "Paid" },
        { id: "PR-8003", name: "Vendor - Foodies", amount: "$2,200.00", status: "Overdue" },
      ]}
    />
  )
}
