import { PageWrapper } from "@/components/page-wrapper"

export default function PayrollPage() {
  return (
    <PageWrapper
      title="Payroll"
      actionLabel="Run Payroll"
      rows={[
        { id: "PY-10001", name: "July Salaries", amount: "RWF 72,000,000", status: "Paid" },
        { id: "PY-10002", name: "Overtime", amount: "RWF 3,400,000", status: "Pending" },
        { id: "PY-10003", name: "Bonuses", amount: "RWF 12,000,000", status: "Overdue" },
      ]}
    />
  )
}
