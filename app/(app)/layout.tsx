"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Override shadcn sidebar theme using CSS variables on the provider wrapper.
  // Colors derived from the requested palette.
  // HSL approximations:
  // primary green (#32872e) -> 117 49% 35%
  // accent yellow (#e0d722) -> 57 75% 50%
  // light bg (#f0f1f2) -> 210 10% 95%
  // foreground white -> 0 0% 100%
  // border slightly darker -> 210 10% 80%
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            // Sidebar theming (see shadcn sidebar docs).
            "--sidebar-background": "117 49% 35%",
            "--sidebar-foreground": "0 0% 100%",
            "--sidebar-accent": "57 75% 50%",
            "--sidebar-accent-foreground": "0 0% 0%",
            "--sidebar-border": "210 10% 80%",
            "--sidebar-ring": "117 49% 35%",
            "--sidebar-primary": "117 49% 35%",
            "--sidebar-primary-foreground": "0 0% 100%",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="bg-[#f0f1f2]">
          <SiteHeader />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
