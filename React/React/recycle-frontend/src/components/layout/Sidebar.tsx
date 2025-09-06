import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  ClipboardCheck,
  Map,
  Route,
  Users,
  Settings,
  Menu,
  X,
  Leaf,
  Truck,
  FileCheck,
  TrendingUp
} from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/",
    badge: null
  },
  {
    title: "Item Reviews",
    icon: FileCheck,
    path: "/reviews",
    badge: "12"
  },
  {
    title: "Pickup Management",
    icon: Truck,
    path: "/pickups",
    badge: null
  },
  {
    title: "Route Planning",
    icon: Route,
    path: "/routes",
    badge: null
  },
  {
    title: "User Management",
    icon: Users,
    path: "/users",
    badge: null
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    path: "/analytics",
    badge: null
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    badge: null
  }
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className={cn(
      "flex flex-col bg-gradient-to-b from-[hsl(var(--sage)_/_0.3)] via-[hsl(var(--forest-light)_/_0.25)] to-[hsl(var(--earth-light)_/_0.2)] border-r border-[hsl(var(--forest)_/_0.3)] transition-all duration-300 shadow-xl backdrop-blur-sm relative z-20",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--forest)_/_0.3)] bg-gradient-to-r from-[hsl(var(--sage)_/_0.25)] to-[hsl(var(--forest-light)_/_0.2)] backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--forest))] to-[hsl(var(--forest-light))] rounded-lg flex items-center justify-center shadow-md">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-[hsl(var(--forest))]">Eco Track</h1>
              <p className="text-xs text-[hsl(var(--earth))]">Admin Panel</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 text-[hsl(var(--forest))] hover:bg-[hsl(var(--sage)_/_0.2)]"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "hover:bg-[hsl(var(--sage)_/_0.15)]",
              isActive(item.path) 
                ? "bg-[hsl(var(--forest-light)_/_0.2)] text-[hsl(var(--forest))] border border-[hsl(var(--forest)_/_0.4)] shadow-md" 
                : "text-[hsl(var(--earth))] hover:text-[hsl(var(--forest))]",
              isCollapsed && "justify-center px-0"
            )}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "h-6 w-6")} />
            {!isCollapsed && (
              <>
                <span className="font-medium">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700 border-orange-200">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[hsl(var(--forest)_/_0.3)] bg-gradient-to-r from-[hsl(var(--earth-light)_/_0.15)] to-[hsl(var(--sage)_/_0.2)] backdrop-blur-sm">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--ocean))] to-[hsl(var(--forest))] flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[hsl(var(--forest))] truncate">Admin User</p>
              <p className="text-xs text-[hsl(var(--earth))] truncate">admin@ecotrack.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}