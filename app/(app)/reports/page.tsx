import { PageWrapper } from "@/components/page-wrapper"

export default function ReportsAnalyticsPage() {
  return (
    <PageWrapper
      title="Reports & Analytics"
      actionLabel="Generate Report"
      rows={[
        { id: "RA-13001", name: "Cash Flow Statement", amount: "$—", status: "Pending" },
        { id: "RA-13002", name: "Balance Sheet", amount: "$—", status: "Paid" },
        { id: "RA-13003", name: "P&L Summary", amount: "$—", status: "Overdue" },
      ]}
    />
  )
}
