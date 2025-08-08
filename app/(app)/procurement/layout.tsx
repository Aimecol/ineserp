"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"

export default function ProcurementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  const tabs = [
    { value: "overview", label: "Overview", path: "/procurement" },
    { value: "workflow", label: "Workflow", path: "/procurement/workflow" },
    { value: "vendors", label: "Vendor Management", path: "/procurement/vendors" },
    { value: "grn", label: "Goods Received", path: "/procurement/grn" },
    { value: "budget", label: "Budget", path: "/procurement/budget" },
  ]

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Tabs
        value={tabs.find(tab => pathname.includes(tab.value))?.value ?? "overview"}
        className="space-y-4"
        onValueChange={(value) => {
          const tab = tabs.find(tab => tab.value === value)
          if (tab) {
            router.push(tab.path)
          }
        }}
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {children}
    </div>
  )
}
