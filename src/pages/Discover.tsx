import { motion } from "framer-motion"
import { Sparkles, TrendingUp } from "lucide-react"
import { QuickAddCard, type MatchedJob } from "../components/discover/QuickAddCard"
import { useJobStore } from "../store/useJobStore"
import { useUserStore } from "../store/useUserStore"

// Mock matched jobs data
const MATCHED_JOBS: MatchedJob[] = [
    {
        id: "1",
        company: "Stripe",
        role: "Senior Product Manager",
        location: "San Francisco, CA",
        salary: "$180,000 - $220,000",
        matchScore: 95,
        description:
            "Lead product strategy for our payments platform, working with cross-functional teams to deliver innovative solutions for millions of businesses worldwide.",
        requirements: ["5+ years PM experience", "Fintech background", "Data-driven", "Leadership"],
        source: "LinkedIn",
    },
    {
        id: "2",
        company: "Notion",
        role: "Software Engineer - Frontend",
        location: "Remote",
        salary: "$160,000 - $200,000",
        matchScore: 92,
        description:
            "Build delightful user experiences for millions of users. Work on our core editor, collaboration features, and design system.",
        requirements: ["React/TypeScript", "3+ years experience", "Design sense", "Remote-first"],
        source: "Company Website",
    },
    {
        id: "3",
        company: "Figma",
        role: "UX Designer",
        location: "New York, NY",
        salary: "$140,000 - $180,000",
        matchScore: 88,
        description:
            "Design the future of collaborative design tools. Work on features that empower designers and developers to create better products together.",
        requirements: ["Portfolio required", "Figma expert", "Systems thinking", "Prototyping"],
        source: "Indeed",
    },
    {
        id: "4",
        company: "Airbnb",
        role: "Data Scientist",
        location: "Seattle, WA",
        salary: "$150,000 - $190,000",
        matchScore: 85,
        description:
            "Use data to drive product decisions and improve the guest and host experience. Build models and insights that shape our marketplace.",
        requirements: ["Python/R", "ML experience", "SQL", "Communication"],
        source: "Handshake",
    },
    {
        id: "5",
        company: "Shopify",
        role: "Full Stack Engineer",
        location: "Austin, TX",
        salary: "$145,000 - $175,000",
        matchScore: 82,
        description:
            "Build tools that empower entrepreneurs around the world. Work across the stack to deliver features that help merchants grow their businesses.",
        requirements: ["Ruby/Rails", "React", "4+ years", "E-commerce"],
        source: "LinkedIn",
    },
    {
        id: "6",
        company: "Databricks",
        role: "Machine Learning Engineer",
        location: "Remote",
        salary: "$170,000 - $210,000",
        matchScore: 80,
        description:
            "Build ML infrastructure and tools for data teams. Work on cutting-edge problems in distributed computing and machine learning at scale.",
        requirements: ["Python", "Spark", "ML frameworks", "Distributed systems"],
        source: "Company Website",
    },
]

export function Discover() {
    const { addApplication } = useJobStore()
    const { profile } = useUserStore()

    const handleAddJob = (job: Omit<MatchedJob, "id" | "matchScore" | "description" | "requirements">) => {
        addApplication({
            ...job,
            status: "Saved",
            date: new Date().toISOString().split("T")[0],
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full p-8"
        >
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Discover Jobs</h1>
                </div>
                <p className="text-muted-foreground">
                    AI-powered job recommendations based on your profile and preferences
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <TrendingUp className="h-4 w-4" />
                        New Matches
                    </div>
                    <p className="text-2xl font-bold">{MATCHED_JOBS.length}</p>
                </div>
                <div className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Avg Match Score</div>
                    <p className="text-2xl font-bold">
                        {Math.round(
                            MATCHED_JOBS.reduce((acc, job) => acc + job.matchScore, 0) / MATCHED_JOBS.length
                        )}
                        %
                    </p>
                </div>
                <div className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Your Preferences</div>
                    <p className="text-2xl font-bold">
                        {profile.preferences.roles.length + profile.preferences.industries.length}
                    </p>
                </div>
            </div>

            {/* Job Grid */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MATCHED_JOBS.map((job, idx) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                            <QuickAddCard job={job} onAdd={handleAddJob} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
