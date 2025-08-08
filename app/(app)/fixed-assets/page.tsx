import { PageWrapper } from "@/components/page-wrapper"

export default function FixedAssetsPage() {
  return (
    <PageWrapper
      title="Fixed Assets"
      actionLabel="Add Asset"
      rows={[
        { id: "FA-12001", name: "School Bus", amount: "$85,000.00", status: "Paid" },
        { id: "FA-12002", name: "3D Printers", amount: "$12,500.00", status: "Pending" },
        { id: "FA-12003", name: "HVAC System", amount: "$60,000.00", status: "Overdue" },
      ]}
    />
  )
}
