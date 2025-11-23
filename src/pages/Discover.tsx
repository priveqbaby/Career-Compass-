import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, TrendingUp, SlidersHorizontal, X } from "lucide-react"
import { QuickAddCard, type MatchedJob } from "../components/discover/QuickAddCard"
import { useJobStore } from "../store/useJobStore"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"

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

interface JobPreferences {
    roles: string[]
    disciplines: string[]
    minSalary: string
    maxSalary: string
    locations: string[]
    workType: string[]
    experienceLevel: string[]
    companySize: string[]
}

export function Discover() {
    const { addApplication } = useJobStore()
    const [showFilters, setShowFilters] = useState(false)
    const [preferences, setPreferences] = useState<JobPreferences>({
        roles: [],
        disciplines: [],
        minSalary: "",
        maxSalary: "",
        locations: [],
        workType: [],
        experienceLevel: [],
        companySize: [],
    })

    const handleAddJob = (job: Omit<MatchedJob, "id" | "matchScore" | "description" | "requirements">) => {
        addApplication({
            ...job,
            status: "Saved",
            date: new Date().toISOString().split("T")[0],
        })
    }

    const addPreferenceItem = (category: keyof JobPreferences, value: string) => {
        if (Array.isArray(preferences[category])) {
            const currentArray = preferences[category] as string[]
            if (!currentArray.includes(value) && value.trim()) {
                setPreferences({
                    ...preferences,
                    [category]: [...currentArray, value.trim()],
                })
            }
        }
    }

    const removePreferenceItem = (category: keyof JobPreferences, value: string) => {
        if (Array.isArray(preferences[category])) {
            setPreferences({
                ...preferences,
                [category]: (preferences[category] as string[]).filter((item) => item !== value),
            })
        }
    }

    const ROLE_SUGGESTIONS = ["Software Engineer", "Product Manager", "Data Scientist", "Designer", "Marketing Manager"]
    const DISCIPLINE_SUGGESTIONS = ["Technology", "Finance", "Healthcare", "E-commerce", "Education", "Consulting"]
    const WORK_TYPE_OPTIONS = ["Remote", "Hybrid", "On-site", "Flexible"]
    const EXPERIENCE_OPTIONS = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"]
    const COMPANY_SIZE_OPTIONS = ["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight">Discover Jobs</h1>
                    </div>
                    <p className="text-muted-foreground">
                        AI-powered job recommendations based on your preferences
                    </p>
                </div>
                <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    {showFilters ? "Hide" : "Show"} Preferences
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Preferences Panel */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-card border rounded-xl p-6 sticky top-0 space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Job Preferences</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Customize your job recommendations
                                    </p>
                                </div>

                                {/* Roles */}
                                <div>
                                    <Label className="text-sm font-medium">Roles</Label>
                                    <div className="flex gap-2 mt-2 mb-2">
                                        <Input
                                            placeholder="Add role..."
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    addPreferenceItem("roles", e.currentTarget.value)
                                                    e.currentTarget.value = ""
                                                }
                                            }}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {ROLE_SUGGESTIONS.map((role) => (
                                            <Badge
                                                key={role}
                                                variant={preferences.roles.includes(role) ? "default" : "outline"}
                                                className="cursor-pointer text-xs"
                                                onClick={() =>
                                                    preferences.roles.includes(role)
                                                        ? removePreferenceItem("roles", role)
                                                        : addPreferenceItem("roles", role)
                                                }
                                            >
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                    {preferences.roles.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {preferences.roles.map((role) => (
                                                <Badge key={role} className="gap-1 text-xs">
                                                    {role}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer"
                                                        onClick={() => removePreferenceItem("roles", role)}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Disciplines */}
                                <div>
                                    <Label className="text-sm font-medium">Industry</Label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {DISCIPLINE_SUGGESTIONS.map((disc) => (
                                            <Badge
                                                key={disc}
                                                variant={preferences.disciplines.includes(disc) ? "default" : "outline"}
                                                className="cursor-pointer text-xs"
                                                onClick={() =>
                                                    preferences.disciplines.includes(disc)
                                                        ? removePreferenceItem("disciplines", disc)
                                                        : addPreferenceItem("disciplines", disc)
                                                }
                                            >
                                                {disc}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Salary Range */}
                                <div>
                                    <Label className="text-sm font-medium">Salary Range</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <Input
                                            placeholder="Min"
                                            value={preferences.minSalary}
                                            onChange={(e) =>
                                                setPreferences({ ...preferences, minSalary: e.target.value })
                                            }
                                            className="text-sm"
                                        />
                                        <Input
                                            placeholder="Max"
                                            value={preferences.maxSalary}
                                            onChange={(e) =>
                                                setPreferences({ ...preferences, maxSalary: e.target.value })
                                            }
                                            className="text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Work Type */}
                                <div>
                                    <Label className="text-sm font-medium">Work Type</Label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {WORK_TYPE_OPTIONS.map((type) => (
                                            <Badge
                                                key={type}
                                                variant={preferences.workType.includes(type) ? "default" : "outline"}
                                                className="cursor-pointer text-xs"
                                                onClick={() =>
                                                    preferences.workType.includes(type)
                                                        ? removePreferenceItem("workType", type)
                                                        : addPreferenceItem("workType", type)
                                                }
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <Label className="text-sm font-medium">Experience Level</Label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {EXPERIENCE_OPTIONS.map((exp) => (
                                            <Badge
                                                key={exp}
                                                variant={
                                                    preferences.experienceLevel.includes(exp) ? "default" : "outline"
                                                }
                                                className="cursor-pointer text-xs"
                                                onClick={() =>
                                                    preferences.experienceLevel.includes(exp)
                                                        ? removePreferenceItem("experienceLevel", exp)
                                                        : addPreferenceItem("experienceLevel", exp)
                                                }
                                            >
                                                {exp}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Company Size */}
                                <div>
                                    <Label className="text-sm font-medium">Company Size</Label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {COMPANY_SIZE_OPTIONS.map((size) => (
                                            <Badge
                                                key={size}
                                                variant={preferences.companySize.includes(size) ? "default" : "outline"}
                                                className="cursor-pointer text-xs"
                                                onClick={() =>
                                                    preferences.companySize.includes(size)
                                                        ? removePreferenceItem("companySize", size)
                                                        : addPreferenceItem("companySize", size)
                                                }
                                            >
                                                {size}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Locations */}
                                <div>
                                    <Label className="text-sm font-medium">Locations</Label>
                                    <Input
                                        placeholder="Add location..."
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                addPreferenceItem("locations", e.currentTarget.value)
                                                e.currentTarget.value = ""
                                            }
                                        }}
                                        className="text-sm mt-2"
                                    />
                                    {preferences.locations.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {preferences.locations.map((loc) => (
                                                <Badge key={loc} className="gap-1 text-xs">
                                                    {loc}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer"
                                                        onClick={() => removePreferenceItem("locations", loc)}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Job Grid */}
                    <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
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
                                        MATCHED_JOBS.reduce((acc, job) => acc + job.matchScore, 0) /
                                        MATCHED_JOBS.length
                                    )}
                                    %
                                </p>
                            </div>
                            <div className="bg-card border rounded-lg p-4">
                                <div className="text-sm text-muted-foreground mb-1">Active Filters</div>
                                <p className="text-2xl font-bold">
                                    {preferences.roles.length +
                                        preferences.disciplines.length +
                                        preferences.workType.length +
                                        preferences.experienceLevel.length +
                                        preferences.companySize.length +
                                        preferences.locations.length}
                                </p>
                            </div>
                        </div>

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
                </div>
            </div>
        </motion.div>
    )
}
