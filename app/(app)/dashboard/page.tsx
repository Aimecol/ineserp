"use client"

import { motion } from "framer-motion"
import { DashboardKPIs } from "@/components/dashboard-kpis"
import { IncomeExpenseTrends } from "@/components/dashboard-trends"
import { AlertsDeadlines } from "@/components/dashboard-alerts"
import { DrilldownReports } from "@/components/dashboard-drilldown"

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4 px-4 pb-8 pt-4 md:px-6"
    >
      {/* Institution-wide KPIs */}
      <section aria-labelledby="kpis">
        <h2 id="kpis" className="sr-only">Institution-wide KPIs</h2>
        <DashboardKPIs />
      </section>

      {/* Income vs Expense Trends */}
      <section aria-labelledby="trends" className="grid">
        <h2 id="trends" className="sr-only">Income vs Expense Trends</h2>
        <IncomeExpenseTrends />
      </section>

      {/* Alerts & Deadlines + Drill-down Reports */}
      <section aria-labelledby="alerts-and-drilldown" className="grid gap-4 lg:grid-cols-2">
        <h2 id="alerts-and-drilldown" className="sr-only">Alerts and Drill-down Reports</h2>
        <AlertsDeadlines />
        <DrilldownReports />
      </section>
    </motion.div>
  )
}
