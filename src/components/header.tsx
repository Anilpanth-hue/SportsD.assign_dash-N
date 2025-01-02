"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Trophy, Search } from 'lucide-react'
import { useTheme } from "next-themes"
import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Payouts", href: "/dashboard/payouts" },
  { name: "Settings", href: "/dashboard/settings" },
]

export function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your search logic here
    console.log("Searching for:", searchQuery)
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground mr-4">
          <Trophy className="h-6 w-6" />
          <span className="hidden sm:inline-block">SportsDuniya</span>
        </Link>
        <form onSubmit={handleSearch} className="flex-1 max-w-md mr-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end md:space-x-4 lg:space-x-6">
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
