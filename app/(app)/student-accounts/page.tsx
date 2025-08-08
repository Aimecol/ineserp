import { PageWrapper } from "@/components/page-wrapper"

export default function StudentAccountsPage() {
  return (
    <PageWrapper
      title="Student Accounts"
      actionLabel="Add Student"
      rows={[
        { id: "SA-3001", name: "Tuition - Jane Smith", amount: "$1,200.00", status: "Pending" },
        { id: "SA-3002", name: "Library Fee - John Lee", amount: "$150.00", status: "Paid" },
        { id: "SA-3003", name: "Lab Fee - Ann Park", amount: "$90.00", status: "Overdue" },
      ]}
    />
  )
}
