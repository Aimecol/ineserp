"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  const tabs = [
    { value: "overview", label: "Overview", path: "/payroll" },
    { value: "employees", label: "Employee Info", path: "/payroll/employees" },
    { value: "payslips", label: "Payslip Generator", path: "/payroll/payslips" },
    { value: "deductions", label: "Statutory Deductions", path: "/payroll/deductions" },
    { value: "leave", label: "Leave & Absence", path: "/payroll/leave" },
    { value: "reports", label: "Payroll Reports", path: "/payroll/reports" },
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
