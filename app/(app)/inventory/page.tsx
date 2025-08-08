import { PageWrapper } from "@/components/page-wrapper"

export default function InventoryPage() {
  return (
    <PageWrapper
      title="Inventory"
      actionLabel="Add Item"
      rows={[
        { id: "IN-6001", name: "Textbooks - Calc 101", amount: "120 units", status: "Pending" },
        { id: "IN-6002", name: "Chromebooks", amount: "45 units", status: "Paid" },
        { id: "IN-6003", name: "Projectors", amount: "5 units", status: "Overdue" },
      ]}
    />
  )
}
