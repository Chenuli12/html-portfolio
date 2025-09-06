import { useState } from "react"
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  MoreHorizontal,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Upload
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Textarea } from "../components/ui/textarea"
import { useToast } from "../hooks/use-toast"

const mockSubmissions = [
  {
    id: "RV001",
    user: "John Doe",
    email: "john@example.com",
    location: "Downtown Area",
    itemType: "Plastic Bottles",
    quantity: "25 bottles",
    submittedAt: "2024-01-20 09:30",
    status: "pending",
    images: ["/placeholder.svg", "/placeholder.svg"],
    estimatedWeight: "2.5kg",
    notes: "Clean bottles, separated by color"
  },
  {
    id: "RV002", 
    user: "Sarah Wilson",
    email: "sarah@example.com",
    location: "Suburban District",
    itemType: "Cardboard",
    quantity: "10 boxes",
    submittedAt: "2024-01-20 08:15",
    status: "approved",
    images: ["/placeholder.svg"],
    estimatedWeight: "5.2kg",
    notes: "Flattened boxes, dry condition"
  },
  {
    id: "RV003",
    user: "Mike Johnson", 
    email: "mike@example.com",
    location: "Business District",
    itemType: "Electronics",
    quantity: "3 items",
    submittedAt: "2024-01-20 07:45",
    status: "rejected",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    estimatedWeight: "8.1kg",
    notes: "Old computer parts, batteries removed"
  }
]

export default function ItemReviews() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning/10 text-warning border-warning/20"
      case "approved": return "bg-success/10 text-success border-success/20" 
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="h-3 w-3" />
      case "approved": return <CheckCircle2 className="h-3 w-3" />
      case "rejected": return <XCircle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const handleApprove = (id: string) => {
    toast({
      title: "Item Approved",
      description: `Submission ${id} has been approved for pickup.`
    })
  }

  const handleReject = (id: string) => {
    toast({
      title: "Item Rejected", 
      description: `Submission ${id} has been rejected.`,
      variant: "destructive"
    })
  }

  const handleBatchAction = (action: string) => {
    toast({
      title: `Batch ${action}`,
      description: `${selectedItems.length} items have been ${action.toLowerCase()}.`
    })
    setSelectedItems([])
  }

  const filteredSubmissions = mockSubmissions.filter(item => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesSearch = item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Item Reviews</h1>
          <p className="text-muted-foreground">Review and approve recyclable item submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
        </div>
      </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-warning/90 shadow-elevated border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/90">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">12</p>
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
                  <p className="text-sm text-white/90">Approved Today</p>
                  <p className="text-2xl font-bold text-white">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/90 shadow-card border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <XCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/90">Rejected Today</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-eco shadow-eco border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/90">Avg Review Time</p>
                  <p className="text-2xl font-bold text-white">3.2m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, item type, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedItems.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} item(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleBatchAction("Approved")}>
                  <Check className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBatchAction("Rejected")}>
                  <X className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedItems.length === filteredSubmissions.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedItems(filteredSubmissions.map(item => item.id))
                      } else {
                        setSelectedItems([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Item Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(submission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems([...selectedItems, submission.id])
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== submission.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{submission.user}</div>
                      <div className="text-sm text-muted-foreground">{submission.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{submission.itemType}</TableCell>
                  <TableCell>{submission.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {submission.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {submission.submittedAt}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(submission.status)}>
                      {getStatusIcon(submission.status)}
                      <span className="ml-1 capitalize">{submission.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission {submission.id}</DialogTitle>
                          </DialogHeader>
                          {selectedSubmission && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">User</label>
                                  <p>{selectedSubmission.user}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Item Type</label>
                                  <p>{selectedSubmission.itemType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Quantity</label>
                                  <p>{selectedSubmission.quantity}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Estimated Weight</label>
                                  <p>{selectedSubmission.estimatedWeight}</p>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Images</label>
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                  {selectedSubmission.images.map((img: string, idx: number) => (
                                    <img key={idx} src={img} alt={`Item ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Notes</label>
                                <p className="text-sm text-muted-foreground">{selectedSubmission.notes}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Admin Notes</label>
                                <Textarea placeholder="Add review notes..." className="mt-1" />
                              </div>
                              
                              <div className="flex gap-2 pt-4">
                                <Button onClick={() => handleApprove(selectedSubmission.id)} className="flex-1">
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button variant="outline" onClick={() => handleReject(selectedSubmission.id)} className="flex-1">
                                  <X className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {submission.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(submission.id)}
                          >
                            <Check className="h-4 w-4 text-success" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(submission.id)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}