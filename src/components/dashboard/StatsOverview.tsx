import { Briefcase, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useJobStore } from "../../store/useJobStore"

export function StatsOverview() {
    const { applications } = useJobStore()

    const total = applications.length
    const active = applications.filter(app => ['Applied', 'Interviewing'].includes(app.status)).length
    const responseRate = total > 0
        ? Math.round((applications.filter(app => ['Interviewing', 'Offer', 'Rejected'].includes(app.status)).length / total) * 100)
        : 0
    const upcomingInterviews = applications.filter(app => app.status === 'Interviewing').length

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{total}</div>
                    <p className="text-xs text-muted-foreground">
                        Across all stages
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{active}</div>
                    <p className="text-xs text-muted-foreground">
                        In progress
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{responseRate}%</div>
                    <p className="text-xs text-muted-foreground">
                        Positive responses
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{upcomingInterviews}</div>
                    <p className="text-xs text-muted-foreground">
                        Next 7 days
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
