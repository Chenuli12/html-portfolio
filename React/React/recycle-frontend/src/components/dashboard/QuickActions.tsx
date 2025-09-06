import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { toast } from "../../hooks/use-toast"
import { 
  FileCheck, 
  Truck, 
  Route, 
  UserPlus, 
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle,
  XCircle
} from "lucide-react"
import { useState } from "react"

// Mock data for pending photo approvals
const pendingPhotoApprovals = [
  {
    id: 1,
    customerName: "John Doe",
    photoUrl: "https://images.unsplash.com/photo-1586711842123-fda3a9f34f67?w=400&h=300&fit=crop",
    detectedWaste: "Plastic Bottles",
    confidence: 0.75,
    location: "Downtown Area",
    timestamp: "2024-01-20 14:30"
  },
  {
    id: 2,
    customerName: "Sarah Wilson",
    photoUrl: "https://images.unsplash.com/photo-1606571332225-e15a72db7ca5?w=400&h=300&fit=crop",
    detectedWaste: "Electronic Waste",
    confidence: 0.45,
    location: "Business District",
    timestamp: "2024-01-20 15:15"
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    photoUrl: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=400&h=300&fit=crop",
    detectedWaste: "Organic Waste",
    confidence: 0.60,
    location: "Residential Area",
    timestamp: "2024-01-20 16:00"
  }
]

const quickActions = [
  {
    title: "Review Pending Items",
    description: "12 items need approval",
    icon: FileCheck,
    badge: "12",
    badgeVariant: "warning" as const,
    href: "/reviews"
  },
  {
    title: "Photo Detection Approval",
    description: "3 photos need manual review",
    icon: Camera,
    badge: "3",
    badgeVariant: "destructive" as const,
    href: null,
    isDialog: true
  },
  {
    title: "Schedule Pickup",
    description: "Add new pickup location",
    icon: Truck,
    badge: null,
    badgeVariant: null,
    href: "/pickups/new"
  },
  {
    title: "Optimize Routes",
    description: "Plan tomorrow's routes",
    icon: Route,
    badge: null,
    badgeVariant: null,
    href: "/routes"
  },
  {
    title: "Emergency Response",
    description: "Handle urgent requests",
    icon: AlertTriangle,
    badge: "2",
    badgeVariant: "destructive" as const,
    href: "/emergency"
  }
]

function PhotoApprovalDialog() {
  const [approvals, setApprovals] = useState(pendingPhotoApprovals)

  const handleApproval = (id: number, approved: boolean) => {
    setApprovals(prev => prev.filter(item => item.id !== id))
    toast({
      title: approved ? "Photo Approved" : "Photo Rejected",
      description: approved 
        ? "Waste detection has been confirmed and added to system"
        : "Photo has been rejected and customer will be notified",
    })
  }

  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Photo Detection Approval</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {approvals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending photo approvals
          </div>
        ) : (
          approvals.map((approval) => (
            <div key={approval.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{approval.customerName}</h3>
                  <p className="text-sm text-muted-foreground">{approval.location} • {approval.timestamp}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApproval(approval.id, true)}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApproval(approval.id, false)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <img 
                    src={approval.photoUrl} 
                    alt="Waste photo" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">AI Detection Result:</label>
                    <p className="text-sm text-muted-foreground">{approval.detectedWaste}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Confidence Level:</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            approval.confidence > 0.7 ? 'bg-green-500' : 
                            approval.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${approval.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(approval.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {approval.confidence < 0.6 && 
                      "⚠️ Low confidence detection - manual review recommended"
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DialogContent>
  )
}

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          if (action.isDialog) {
            return (
              <Dialog key={action.title}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 group hover:bg-gradient-eco/5 hover:border-primary/20 border border-transparent"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <action.icon className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{action.title}</p>
                          {action.badge && (
                            <Badge 
                              variant={action.badgeVariant === "warning" ? "outline" : action.badgeVariant}
                              className={
                                action.badgeVariant === "warning" 
                                  ? "bg-warning/10 text-warning border-warning/20"
                                  : ""
                              }
                            >
                              {action.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Button>
                </DialogTrigger>
                <PhotoApprovalDialog />
              </Dialog>
            )
          }

          return (
            <Button
              key={action.title}
              variant="ghost"
              className="w-full justify-start h-auto p-4 group hover:bg-gradient-eco/5 hover:border-primary/20 border border-transparent"
              asChild
            >
              <a href={action.href}>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{action.title}</p>
                      {action.badge && (
                        <Badge 
                          variant={action.badgeVariant === "warning" ? "outline" : action.badgeVariant}
                          className={
                            action.badgeVariant === "warning" 
                              ? "bg-warning/10 text-warning border-warning/20"
                              : ""
                          }
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}