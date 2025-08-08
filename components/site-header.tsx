"use client"

import { Bell, Menu, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"

type SiteHeaderProps = {
  title?: string
}

export function SiteHeader({ title = "Dashboard" }: SiteHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <motion.header
      initial={mounted ? { y: -8, opacity: 0 } : false}
      animate={mounted ? { y: 0, opacity: 1 } : false}
      transition={mounted ? { duration: 0.25 } : false}
      className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="flex h-14 items-center gap-2 px-3">
        <SidebarTrigger className="md:hidden" aria-label="Toggle sidebar">
          <Menu className="h-4 w-4" />
        </SidebarTrigger>

        <div className="hidden md:block">
          <SidebarTrigger aria-label="Toggle sidebar" />
        </div>

        <div className="ml-1 flex-1 truncate">
          <h1 className="text-base font-semibold text-black md:text-lg">{title}</h1>
        </div>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5 text-[#6c8391]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm sm:inline">{user?.name || 'User'}</span>
              <ChevronDown className="h-4 w-4 text-[#6c8391]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || 'User'}</span>
                <span className="text-xs text-muted-foreground">{user?.role || 'Role'}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}
