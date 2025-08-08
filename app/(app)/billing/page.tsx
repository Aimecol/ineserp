import { PageWrapper } from "@/components/page-wrapper"

export default function BillingPage() {
  return (
    <PageWrapper
      title="Billing & Receipting"
      actionLabel="Create Invoice"
      rows={[
        { id: "BL-9001", name: "Invoice #4492", amount: "$1,500.00", status: "Paid" },
        { id: "BL-9002", name: "Invoice #4493", amount: "$980.00", status: "Pending" },
        { id: "BL-9003", name: "Invoice #4494", amount: "$2,100.00", status: "Overdue" },
      ]}
    />
  )
}
