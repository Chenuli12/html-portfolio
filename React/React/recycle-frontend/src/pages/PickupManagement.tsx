import { useState } from "react"
import { 
  Calendar,
  Clock,
  MapPin,
  Truck,
  User,
  Phone,
  Check,
  X,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Navigation,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useToast } from "../hooks/use-toast"

const mockPickups = [
  {
    id: "PK001",
    user: "John Doe",
    phone: "+1 234-567-8900",
    address: "123 Main St, Downtown",
    itemType: "Plastic Bottles",
    quantity: "25 bottles",
    scheduledTime: "2024-01-20 14:00",
    status: "scheduled",
    driver: "Mike Wilson",
    truck: "Truck A",
    priority: "normal",
    notes: "Second floor apartment, ring doorbell"
  },
  {
    id: "PK002",
    user: "Sarah Johnson", 
    phone: "+1 234-567-8901",
    address: "456 Oak Ave, Suburban",
    itemType: "Cardboard",
    quantity: "10 boxes",
    scheduledTime: "2024-01-20 15:30",
    status: "in-progress",
    driver: "Tom Anderson",
    truck: "Truck B", 
    priority: "high",
    notes: "Large items, may need assistance"
  },
  {
    id: "PK003",
    user: "Emily Davis",
    phone: "+1 234-567-8902", 
    address: "789 Pine St, Business District",
    itemType: "Electronics",
    quantity: "3 items",
    scheduledTime: "2024-01-20 16:00",
    status: "completed",
    driver: "Jake Miller",
    truck: "Truck C",
    priority: "normal",
    notes: "Office building, security desk"
  }
]

const mockDrivers = [
  { id: "D001", name: "Mike Wilson", truck: "Truck A", status: "available" },
  { id: "D002", name: "Tom Anderson", truck: "Truck B", status: "on-route" },
  { id: "D003", name: "Jake Miller", truck: "Truck C", status: "available" }
]

export default function PickupManagement() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-primary/10 text-primary border-primary/20"
      case "in-progress": return "bg-warning/10 text-warning border-warning/20"
      case "completed": return "bg-success/10 text-success border-success/20"
      case "cancelled": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-border"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20"
      case "normal": return "bg-muted/10 text-muted-foreground border-border" 
      case "low": return "bg-success/10 text-success border-success/20"
      default: return "bg-muted/10 text-muted-foreground border-border"
    }
  }

  const handleStatusUpdate = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Pickup ${id} status changed to ${newStatus}.`
    })
  }

  const handleAssignDriver = (pickupId: string, driverId: string) => {
    toast({
      title: "Driver Assigned",
      description: `Driver assigned to pickup ${pickupId}.`
    })
  }

  const filteredPickups = mockPickups.filter(pickup => {
    const matchesStatus = filterStatus === "all" || pickup.status === filterStatus
    const matchesSearch = pickup.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pickup.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pickup Management</h1>
          <p className="text-muted-foreground">Schedule and manage recycling pickups</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Pickup
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Pickup</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer</label>
                    <Input placeholder="Select customer..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date & Time</label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input placeholder="Pickup address..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Item Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">Plastic</SelectItem>
                        <SelectItem value="cardboard">Cardboard</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="glass">Glass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Schedule Pickup</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-eco shadow-eco border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Today's Pickups</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/90 shadow-elevated border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">In Progress</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-forest shadow-elevated border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Completed</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/90 shadow-card border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Overdue</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pickups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pickups">Pickup Schedule</TabsTrigger>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="routes">Route Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="pickups" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search pickups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-48"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pickups Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pickup Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPickups.map((pickup) => (
                    <TableRow key={pickup.id}>
                      <TableCell className="font-medium">{pickup.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pickup.user}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {pickup.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{pickup.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pickup.itemType}</div>
                          <div className="text-sm text-muted-foreground">{pickup.quantity}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {pickup.scheduledTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pickup.driver}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            {pickup.truck}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(pickup.priority)}>
                          {pickup.priority.charAt(0).toUpperCase() + pickup.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pickup.status)}>
                          {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Navigation className="h-4 w-4" />
                          </Button>
                          <Select onValueChange={(value) => handleStatusUpdate(pickup.id, value)}>
                            <SelectTrigger className="w-24 h-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockDrivers.map((driver) => (
                  <Card key={driver.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-forest rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            {driver.truck}
                          </div>
                          <Badge className={driver.status === "available" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                            {driver.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive route map would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}