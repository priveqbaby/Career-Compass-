import { AnalyticsCharts } from "../components/analytics/AnalyticsCharts"
import { motion } from "framer-motion"

export function Analytics() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full p-8 space-y-8 overflow-y-auto"
        >
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground mt-2">Insights into your job search performance</p>
            </div>

            <AnalyticsCharts />
        </motion.div>
    )
}
