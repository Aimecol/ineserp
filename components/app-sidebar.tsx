"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Briefcase, Wrench, Boxes, LineChart, CreditCard, Receipt, Wallet, ShoppingCart, Building2, BarChart3, SettingsIcon } from 'lucide-react'

type Item = {
  title: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const items: Item[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Student Accounts", url: "/student-accounts", icon: Users },
  { title: "Project Accounts", url: "/project-accounts", icon: Briefcase },
  { title: "Utility Accounts", url: "/utility-accounts", icon: Wrench },
  { title: "Inventory", url: "/inventory", icon: Boxes },
  { title: "Income & Expenses", url: "/income-expenses", icon: LineChart },
  { title: "Payables/Receivables", url: "/payables-receivables", icon: CreditCard },
  { title: "Billing & Receipting", url: "/billing", icon: Receipt },
  { title: "Payroll", url: "/payroll", icon: Wallet },
  { title: "Procurement", url: "/procurement", icon: ShoppingCart },
  { title: "Fixed Assets", url: "/fixed-assets", icon: Building2 },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      // We use our palette for text and hover. Background is themed via SidebarProvider style in the layout.
      className="text-white"
      collapsible="offcanvas"
    >
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-[#e0d722]" />
          <div className="font-semibold">FinOps Suite</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.url) ?? false
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      // Text is white, icons muted gray; hover bg uses accent yellow.
                      className={`text-white data-[active=true]:bg-[#256a24] hover:bg-[#e0d722] hover:text-black transition-colors`}
                    >
                      <Link href={item.url} aria-label={item.title}>
                        <Icon className={`text-[#6c8391] group-hover:text-black ${isActive ? "text-white" : ""}`} />
                        <span className={`text-[#6c8391] group-hover:text-black ${isActive ? "text-white" : ""}`}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4">
        <div className="text-xs text-[#6c8391]/70">ERP v1.0.0</div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
