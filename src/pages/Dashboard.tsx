import { useState } from "react"
import { KanbanBoard } from "../components/dashboard/KanbanBoard"
import { StatsOverview } from "../components/dashboard/StatsOverview"
import { AddApplicationDialog } from "../components/dashboard/AddApplicationDialog"
import { motion } from "framer-motion"
import { Input } from "../components/ui/input"
import { Search } from "lucide-react"
import { useJobStore } from "../store/useJobStore"

export function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const { applications } = useJobStore()

    const filteredApplications = applications.filter(app =>
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full p-8"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Track your job search progress</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search applications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <AddApplicationDialog />
                </div>
            </div>

            <StatsOverview />

            <div className="flex-1 min-h-0 mt-8 flex flex-col">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Application Pipeline</h2>
                    <p className="text-sm text-muted-foreground">Drag and drop cards to update their status</p>
                </div>
                <KanbanBoard applications={filteredApplications} />
            </div>
        </motion.div>
    )
}
