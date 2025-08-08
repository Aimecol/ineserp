import { PageWrapper } from "@/components/page-wrapper"

export default function UtilityAccountsPage() {
  return (
    <PageWrapper
      title="Utility Accounts"
      actionLabel="Add Utility"
      rows={[
        { id: "UA-5001", name: "Electricity - July", amount: "$3,450.12", status: "Paid" },
        { id: "UA-5002", name: "Water - July", amount: "$620.44", status: "Pending" },
        { id: "UA-5003", name: "Internet - July", amount: "$280.00", status: "Overdue" },
      ]}
    />
  )
}
