import { useState } from "react"
import { 
  Map,
  Navigation,
  Clock,
  Fuel,
  Route as RouteIcon,
  Plus,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  MapPin,
  Truck,
  Users,
  Calendar
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { useToast } from "../hooks/use-toast"

const mockRoutes = [
  {
    id: "RT001",
    name: "Downtown Route A",
    driver: "Mike Wilson",
    truck: "Truck A",
    pickups: 8,
    distance: "24.5 km",
    estimatedTime: "3h 45m",
    fuelCost: "$18.50",
    status: "active",
    efficiency: 92
  },
  {
    id: "RT002", 
    name: "Suburban Route B",
    driver: "Tom Anderson",
    truck: "Truck B",
    pickups: 12,
    distance: "32.1 km", 
    estimatedTime: "4h 20m",
    fuelCost: "$24.30",
    status: "planned",
    efficiency: 87
  },
  {
    id: "RT003",
    name: "Business District Route C",
    driver: "Jake Miller", 
    truck: "Truck C",
    pickups: 6,
    distance: "18.2 km",
    estimatedTime: "2h 50m",
    fuelCost: "$13.80",
    status: "completed",
    efficiency: 95
  }
]

const mockPickupPoints = [
  { id: "P001", address: "123 Main St", type: "residential", priority: "normal", items: "Plastic" },
  { id: "P002", address: "456 Oak Ave", type: "commercial", priority: "high", items: "Cardboard" },
  { id: "P003", address: "789 Pine St", type: "residential", priority: "normal", items: "Electronics" },
  { id: "P004", address: "321 Elm St", type: "commercial", priority: "low", items: "Glass" },
  { id: "P005", address: "654 Maple Dr", type: "residential", priority: "normal", items: "Plastic" }
]

export default function RoutePlanning() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [optimizationMode, setOptimizationMode] = useState("time")
  const [trafficEnabled, setTrafficEnabled] = useState(true)
  const [maxPickups, setMaxPickups] = useState([15])
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20"
      case "planned": return "bg-primary/10 text-primary border-primary/20"
      case "completed": return "bg-muted/10 text-muted-foreground border-border"
      default: return "bg-muted/10 text-muted-foreground border-border"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-success"
    if (efficiency >= 80) return "text-warning" 
    return "text-destructive"
  }

  const handleOptimizeRoute = () => {
    toast({
      title: "Route Optimized",
      description: "Route has been optimized for better efficiency."
    })
  }

  const handleSaveRoute = () => {
    toast({
      title: "Route Saved",
      description: "Route configuration has been saved successfully."
    })
  }

  const handleStartRoute = (routeId: string) => {
    toast({
      title: "Route Started", 
      description: `Route ${routeId} has been started.`
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Route Planning</h1>
          <p className="text-muted-foreground">Optimize pickup routes for maximum efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Routes
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Route</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Route Name</label>
                  <Input placeholder="Enter route name..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Location</label>
                    <Input placeholder="Starting address..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Location</label>
                    <Input placeholder="Ending address..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign Driver</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="tom">Tom Anderson</SelectItem>
                      <SelectItem value="jake">Jake Miller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Create Route</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <RouteIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Navigation className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold text-foreground">91%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Fuel className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Fuel Cost</p>
                <p className="text-2xl font-bold text-foreground">$56.60</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Route Time</p>
                <p className="text-2xl font-bold text-foreground">3h 42m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Route Overview</TabsTrigger>
          <TabsTrigger value="planner">Route Planner</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Route List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Current Routes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRoutes.map((route) => (
                  <div key={route.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{route.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {route.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(route.status)}>
                          {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                        </Badge>
                        <span className={`text-sm font-medium ${getEfficiencyColor(route.efficiency)}`}>
                          {route.efficiency}% efficient
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3 text-muted-foreground" />
                        <span>{route.driver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{route.pickups} pickups</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3 text-muted-foreground" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{route.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">
                        Est. fuel cost: <span className="font-medium text-foreground">{route.fuelCost}</span>
                      </span>
                      <div className="flex gap-2">
                        {route.status === "planned" && (
                          <Button size="sm" onClick={() => handleStartRoute(route.id)}>
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card>
              <CardHeader>
                <CardTitle>Route Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Select a route to view details</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planner" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map Area */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Route Map</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleOptimizeRoute}>
                      <Navigation className="h-4 w-4 mr-2" />
                      Optimize
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveRoute}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive route planning map</p>
                    <p className="text-sm text-muted-foreground">Drag and drop pickup points to optimize routes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Points */}
            <Card>
              <CardHeader>
                <CardTitle>Pickup Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPickupPoints.map((point, index) => (
                  <div key={point.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{point.address}</p>
                      <p className="text-xs text-muted-foreground">{point.items}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {point.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Optimization Priority</label>
                  <Select value={optimizationMode} onValueChange={setOptimizationMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Minimize Travel Time</SelectItem>
                      <SelectItem value="distance">Minimize Distance</SelectItem>
                      <SelectItem value="fuel">Minimize Fuel Cost</SelectItem>
                      <SelectItem value="balanced">Balanced Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Pickups per Route</label>
                  <div className="px-2">
                    <Slider
                      value={maxPickups}
                      onValueChange={setMaxPickups}
                      max={25}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Current: {maxPickups[0]} pickups</p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Real-time Traffic</label>
                  <Switch checked={trafficEnabled} onCheckedChange={setTrafficEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Avoid Toll Roads</label>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Prioritize Eco Routes</label>
                  <Switch defaultChecked />
                </div>

                <Button className="w-full" onClick={handleOptimizeRoute}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Apply Optimization
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Time Saved</p>
                      <p className="text-lg font-bold text-success">24 min</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Distance Reduced</p>
                      <p className="text-lg font-bold text-success">3.2 km</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Fuel Saved</p>
                      <p className="text-lg font-bold text-success">$4.80</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Efficiency</p>
                      <p className="text-lg font-bold text-success">+8%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Optimization Suggestions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-success rounded-full mt-1.5"></div>
                        <span>Reorder pickups 3 and 5 to reduce backtracking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full mt-1.5"></div>
                        <span>Consider splitting route into two shorter routes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                        <span>Schedule high-priority pickups earlier in the day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}