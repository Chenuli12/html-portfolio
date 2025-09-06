import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import Index from "./pages/index"
import Dashboard from "./pages/Dashboard"
import ItemReviews from "./pages/ItemReviews"
import PickupManagement from "./pages/PickupManagement"
import RoutePlanning from "./pages/RoutePlanning"
import UserManagement from "./pages/UserManagement"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout><Index /></Layout>} />
					<Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
					<Route path="/reviews" element={<Layout><ItemReviews /></Layout>} />
					<Route path="/pickups" element={<Layout><PickupManagement /></Layout>} />
					<Route path="/routes" element={<Layout><RoutePlanning /></Layout>} />
					<Route path="/users" element={<Layout><UserManagement /></Layout>} />
					<Route path="/analytics" element={<Layout><Analytics /></Layout>} />
					<Route path="/settings" element={<Layout><Settings /></Layout>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
