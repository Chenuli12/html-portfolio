import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { CheckCircle, XCircle, Truck, UserPlus, Route } from "lucide-react"
import { cn } from "../../lib/utils"

const activities = [
	{
		id: 1,
		type: "approval",
		title: "Item approved",
		description: "Plastic bottle #PL-2024-001 approved for pickup",
		user: "Admin",
		time: "2 minutes ago",
		icon: CheckCircle,
		color: "text-success",
	},
	{
		id: 2,
		type: "pickup",
		title: "Pickup completed",
		description: "Route #RT-001 completed with 15 items collected",
		user: "Driver Mike",
		time: "15 minutes ago",
		icon: Truck,
		color: "text-primary",
	},
	{
		id: 3,
		type: "rejection",
		title: "Item rejected",
		description: "Glass container #GL-2024-032 rejected - contaminated",
		user: "Admin",
		time: "32 minutes ago",
		icon: XCircle,
		color: "text-destructive",
	},
	{
		id: 4,
		type: "user",
		title: "New user registered",
		description: "Sarah Johnson joined the recycling program",
		user: "System",
		time: "1 hour ago",
		icon: UserPlus,
		color: "text-accent",
	},
	{
		id: 5,
		type: "route",
		title: "Route optimized",
		description: "Route #RT-002 optimized for tomorrow's pickups",
		user: "System",
		time: "2 hours ago",
		icon: Route,
		color: "text-primary",
	},
]

export function ActivityFeed() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{activities.map((activity) => (
					<div
						key={activity.id}
						className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
					>
						<div
							className={cn(
								"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
								"bg-background border-2",
								activity.color === "text-success" &&
									"border-success/20 bg-success/10",
								activity.color === "text-destructive" &&
									"border-destructive/20 bg-destructive/10",
								activity.color === "text-primary" &&
									"border-primary/20 bg-primary/10",
								activity.color === "text-accent" &&
									"border-accent/20 bg-accent/10"
							)}
						>
							<activity.icon className={cn("h-4 w-4", activity.color)} />
						</div>

						<div className="flex-1 min-w-0 space-y-1">
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium text-foreground">
									{activity.title}
								</p>
								<Badge variant="outline" className="text-xs">
									{activity.type}
								</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								{activity.description}
							</p>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<Avatar className="w-4 h-4">
									<AvatarFallback className="text-xs">
										{activity.user.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<span>{activity.user}</span>
								<span>•</span>
								<span>{activity.time}</span>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}