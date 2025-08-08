import { PageWrapper } from "@/components/page-wrapper"

export default function SettingsPage() {
  return (
    <PageWrapper
      title="Settings"
      actionLabel="Save Changes"
      rows={[
        { id: "ST-14001", name: "User Roles", amount: "3 roles", status: "Paid" },
        { id: "ST-14002", name: "Billing Config", amount: "Stripe", status: "Pending" },
        { id: "ST-14003", name: "Email Provider", amount: "Resend", status: "Overdue" },
      ]}
    />
  )
}
