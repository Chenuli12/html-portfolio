import { Bell, Search, Menu } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-24 border-b border-[hsl(var(--forest)_/_0.25)] bg-gradient-to-r from-[hsl(var(--sage)_/_0.2)] via-[hsl(var(--ocean-light)_/_0.15)] to-[hsl(var(--earth-light)_/_0.18)] backdrop-blur-md shadow-xl relative z-20">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden text-[hsl(var(--forest))] hover:bg-[hsl(var(--sage)_/_0.1)]"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative w-96 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--earth)_/_0.7)]" />
            <Input
              placeholder="Search items, users, routes..."
              className="pl-9 bg-background/80 border-[hsl(var(--sage)_/_0.25)] focus:border-[hsl(var(--forest)_/_0.4)]"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* System Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-[hsl(var(--forest)_/_0.8)] hidden sm:inline font-medium">
              All systems operational
            </span>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-[hsl(var(--forest))] hover:bg-[hsl(var(--sage)_/_0.1)]">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-warning text-warning-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b border-border bg-gradient-to-r from-[hsl(var(--sage)_/_0.1)] to-[hsl(var(--earth-light)_/_0.08)]">
                <h4 className="font-semibold text-[hsl(var(--forest))]">Notifications</h4>
                <p className="text-sm text-[hsl(var(--earth)_/_0.7)]">You have 3 pending items</p>
              </div>
              <div className="p-2">
                <DropdownMenuItem className="flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="font-medium">12 items pending review</span>
                    <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">New recyclable items need approval</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Route optimization complete</span>
                    <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Today's pickup routes are ready</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium">New user registered</span>
                    <span className="text-xs text-muted-foreground ml-auto">10m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sarah Johnson joined the platform</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <span className="text-[hsl(var(--forest))]">View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}