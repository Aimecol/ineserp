import { PageWrapper } from "@/components/page-wrapper"

export default function IncomeExpensesPage() {
  return (
    <PageWrapper
      title="Income & Expenses"
      actionLabel="Record Entry"
      rows={[
        { id: "IE-7001", name: "Donation Drive", amount: "$6,540.00", status: "Paid" },
        { id: "IE-7002", name: "Cafeteria Supplies", amount: "$1,120.00", status: "Pending" },
        { id: "IE-7003", name: "Sports Equipment", amount: "$2,300.00", status: "Overdue" },
      ]}
    />
  )
}
