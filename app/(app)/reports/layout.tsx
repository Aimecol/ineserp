"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  description: string
}

const reportLinks: NavItem[] = [
  {
    title: "Income Statement",
    href: "/reports/income-statement",
    description: "View income, expenses, and net profit/loss"
  },
  {
    title: "Project Summary",
    href: "/reports/project-summary",
    description: "Track project budgets and financial progress"
  },
  {
    title: "Donor Funds",
    href: "/reports/donor-funds",
    description: "Monitor donor fund allocation and utilization"
  },
  {
    title: "Payroll Summary",
    href: "/reports/payroll-summary",
    description: "Employee salary and benefits overview"
  },
  {
    title: "Vendor Payments",
    href: "/reports/vendor-payments",
    description: "Track vendor payment history and status"
  },
  {
    title: "Utility Expenses",
    href: "/reports/utility-expenses",
    description: "Monitor utility costs and consumption"
  },
  {
    title: "Invoice Aging",
    href: "/reports/invoice-aging",
    description: "Track outstanding invoices and aging periods"
  },
  {
    title: "Budget vs Actual",
    href: "/reports/budget-actual",
    description: "Compare budgeted amounts with actual spending"
  },
  {
    title: "Audit Logs",
    href: "/reports/audit-logs",
    description: "View system audit trail and changes"
  },
  {
    title: "Financial Snapshots",
    href: "/reports/snapshots",
    description: "Daily, weekly, and monthly financial summaries"
  },
  {
    title: "Custom Reports",
    href: "/reports/custom-builder",
    description: "Build and save custom financial reports"
  }
]

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <Card className="md:w-64 p-4">
          <nav className="space-y-2">
            {reportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block p-2 rounded-lg hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div className="font-medium leading-none mb-1">
                  {link.title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {link.description}
                </div>
              </Link>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
