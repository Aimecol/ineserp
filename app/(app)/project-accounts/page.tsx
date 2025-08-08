import { PageWrapper } from "@/components/page-wrapper"

export default function ProjectAccountsPage() {
  return (
    <PageWrapper
      title="Project Accounts"
      actionLabel="New Project"
      rows={[
        { id: "PA-4001", name: "STEM Lab Upgrade", amount: "$25,000.00", status: "Pending" },
        { id: "PA-4002", name: "Community Outreach", amount: "$8,200.00", status: "Paid" },
        { id: "PA-4003", name: "Solar Panel Grant", amount: "$42,000.00", status: "Overdue" },
      ]}
    />
  )
}
