import { PageWrapper } from "@/components/page-wrapper"

export default function PayrollPage() {
  return (
    <PageWrapper
      title="Payroll"
      actionLabel="Run Payroll"
      rows={[
        { id: "PY-10001", name: "July Salaries", amount: "$72,000.00", status: "Paid" },
        { id: "PY-10002", name: "Overtime", amount: "$3,400.00", status: "Pending" },
        { id: "PY-10003", name: "Bonuses", amount: "$12,000.00", status: "Overdue" },
      ]}
    />
  )
}
