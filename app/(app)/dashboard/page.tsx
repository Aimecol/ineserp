import { PageWrapper } from "@/components/page-wrapper"

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      actionLabel="New Widget"
      rows={[
        { id: "DB-2001", name: "Monthly Summary", amount: "$12,450.00", status: "Paid" },
        { id: "DB-2002", name: "Q3 Forecast", amount: "$—", status: "Pending" },
        { id: "DB-2003", name: "Variance Report", amount: "$—", status: "Overdue" },
      ]}
    />
  )
}
