import { useState } from "react"
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Users,
  Recycle,
  Truck,
  DollarSign,
  Leaf,
  Target,
  PieChart,
  LineChart
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30days")
  const [metricType, setMetricType] = useState("all")

  const kpiData = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Items Recycled",
      value: "15,834",
      change: "+12.5%", 
      trend: "up",
      icon: Recycle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "CO₂ Saved",
      value: "2.8 tons",
      change: "+18.3%",
      trend: "up", 
      icon: Leaf,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Revenue",
      value: "$24,680",
      change: "+5.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ]

  const recyclingBreakdown = [
    { type: "Plastic", amount: "45.3%", weight: "2,847 kg", color: "bg-blue-500" },
    { type: "Cardboard", amount: "28.7%", weight: "1,802 kg", color: "bg-green-500" },
    { type: "Electronics", amount: "15.2%", weight: "956 kg", color: "bg-purple-500" },
    { type: "Glass", amount: "10.8%", weight: "678 kg", color: "bg-yellow-500" }
  ]

  const topUsers = [
    { name: "John Doe", items: 84, points: 2340, tier: "Gold" },
    { name: "Sarah Wilson", items: 67, points: 1890, tier: "Gold" },
    { name: "Mike Johnson", items: 52, points: 1456, tier: "Silver" },
    { name: "Emily Davis", items: 48, points: 1244, tier: "Silver" },
    { name: "Alex Chen", items: 41, points: 1123, tier: "Bronze" }
  ]

  const regionalData = [
    { region: "Downtown", pickups: 156, growth: "+12%", efficiency: 94 },
    { region: "Suburban", pickups: 134, growth: "+8%", efficiency: 87 },
    { region: "Business District", pickups: 98, growth: "+15%", efficiency: 91 },
    { region: "Residential Area", pickups: 87, growth: "+6%", efficiency: 83 }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Silver": return "bg-gray-100 text-gray-800 border-gray-300"
      case "Bronze": return "bg-orange-100 text-orange-800 border-orange-300"
      default: return "bg-muted/10 text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance and environmental impact</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-eco shadow-eco border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">Total Users</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/80">+8.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/20">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-forest shadow-elevated border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">Items Recycled</p>
                <p className="text-2xl font-bold text-white">15,834</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/80">+12.5%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/20">
                <Recycle className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-accent/90 shadow-card border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">CO₂ Saved</p>
                <p className="text-2xl font-bold text-white">2.8 tons</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/80">+18.3%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/20">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-warning/90 shadow-card border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">Revenue</p>
                <p className="text-2xl font-bold text-white">$24,680</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/80">+5.7%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/20">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recycling">Recycling Metrics</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Performance charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Users */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={user.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="w-8 h-8 bg-gradient-forest rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.items} items recycled</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{user.points} pts</div>
                      <Badge className={getTierColor(user.tier)} variant="outline">
                        {user.tier}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {regionalData.map((region) => (
                  <div key={region.region} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{region.region}</h3>
                      <span className="text-sm text-success">{region.growth}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pickups</span>
                        <span className="font-medium">{region.pickups}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Efficiency</span>
                          <span className="font-medium">{region.efficiency}%</span>
                        </div>
                        <Progress value={region.efficiency} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recycling" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recycling Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Recycling by Material Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recyclingBreakdown.map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span>{item.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.amount}</div>
                        <div className="text-muted-foreground">{item.weight}</div>
                      </div>
                    </div>
                    <Progress value={parseFloat(item.amount)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Recycling Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Monthly trend charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recycling Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Recycling Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Target</span>
                    <span className="text-sm text-muted-foreground">3,250 / 4,000 items</span>
                  </div>
                  <Progress value={81.25} className="h-3" />
                  <span className="text-xs text-muted-foreground">81.25% completed</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CO₂ Reduction Goal</span>
                    <span className="text-sm text-muted-foreground">2.8 / 3.5 tons</span>
                  </div>
                  <Progress value={80} className="h-3" />
                  <span className="text-xs text-muted-foreground">80% completed</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">User Engagement</span>
                    <span className="text-sm text-muted-foreground">1,247 / 1,500 users</span>
                  </div>
                  <Progress value={83.13} className="h-3" />
                  <span className="text-xs text-muted-foreground">83.13% completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">User growth charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Engagement metrics would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Fleet efficiency charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Route optimization metrics would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <Leaf className="h-6 w-6 text-success mx-auto mb-1" />
                      <div className="text-lg font-bold text-success">2.8 tons</div>
                      <div className="text-xs text-muted-foreground">CO₂ Saved</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <Recycle className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold text-primary">6,283 kg</div>
                      <div className="text-xs text-muted-foreground">Recycled</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Landfill Waste Diverted</span>
                      <span className="font-medium">4.2 tons</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Trees Saved Equivalent</span>
                      <span className="font-medium">47 trees</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Energy Saved</span>
                      <span className="font-medium">1,234 kWh</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Environmental impact timeline would be displayed here</p>
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