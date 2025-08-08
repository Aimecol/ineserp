import { PageWrapper } from "@/components/page-wrapper"

export default function FixedAssetsPage() {
  return (
    <PageWrapper
      title="Fixed Assets"
      actionLabel="Add Asset"
      rows={[
        { id: "FA-12001", name: "School Bus", amount: "RWF 85,000,000", status: "Paid" },
        { id: "FA-12002", name: "3D Printers", amount: "RWF 12,500,000", status: "Pending" },
        { id: "FA-12003", name: "HVAC System", amount: "RWF 60,000,000", status: "Overdue" },
      ]}
    />
  )
}
