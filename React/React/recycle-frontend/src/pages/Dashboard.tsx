import { 
  Recycle, 
  Truck, 
  Users, 
  TrendingUp, 
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { MetricsCard } from "../components/dashboard/MetricsCard"
import { ActivityFeed } from "../components/dashboard/ActivityFeed"
import { QuickActions } from "../components/dashboard/QuickActions"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your recycling operations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total Pickups Today"
          value="47"
          change={{ value: "+12%", type: "increase" }}
          icon={<Truck className="h-6 w-6 text-white" />}
          description="8 routes completed"
          className="bg-gradient-eco shadow-eco border-primary/20"
        />
        <MetricsCard
          title="Pending Reviews"
          value="12"
          change={{ value: "+3", type: "increase" }}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          description="Awaiting approval"
          className="bg-warning/90 shadow-elevated border-warning/20"
        />
        <MetricsCard
          title="Active Users"
          value="1,247"
          change={{ value: "+8.2%", type: "increase" }}
          icon={<Users className="h-6 w-6 text-white" />}
          description="This month"
          className="bg-gradient-forest shadow-elevated border-success/20"
        />
        <MetricsCard
          title="Items Recycled"
          value="2,834"
          change={{ value: "+15%", type: "increase" }}
          icon={<Recycle className="h-6 w-6 text-white" />}
          description="This week"
          className="bg-accent/90 shadow-card border-accent/20"
        />
      </div>

      {/* Maps and Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Tracking Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Vehicle Tracking</CardTitle>
              <Badge className="bg-success/10 text-success border-success/20">
                6 vehicles online
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 bg-gradient-earth rounded-lg overflow-hidden">
              {/* Placeholder for map - in production this would be Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-primary mx-auto" />
                  <div>
                    <p className="font-semibold text-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Live vehicle tracking and route visualization</p>
                    <Button variant="outline" className="mt-2">
                      View Full Map
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Mock vehicle indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className="flex items-center gap-2 bg-card/90 backdrop-blur rounded-lg p-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Truck A - Route 1</span>
                </div>
                <div className="flex items-center gap-2 bg-card/90 backdrop-blur rounded-lg p-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Truck B - Route 2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">API Services</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Operational
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">GPS Tracking</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Online
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Payment Gateway</span>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  Maintenance
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Image Processing</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Active
                </Badge>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeed />
        <QuickActions />
      </div>
    </div>
  )
}