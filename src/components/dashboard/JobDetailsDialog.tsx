import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useJobStore, type JobApplication } from "../../store/useJobStore"
import { Trash2 } from "lucide-react"

interface JobDetailsDialogProps {
    job: JobApplication
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function JobDetailsDialog({ job, open, onOpenChange }: JobDetailsDialogProps) {
    const { updateApplication, deleteApplication } = useJobStore()
    const [formData, setFormData] = useState(job)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setFormData(job)
    }, [job])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateApplication(job.id, formData)
        setIsEditing(false)
        onOpenChange(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this application?")) {
            deleteApplication(job.id)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Application" : "Application Details"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Make changes to your application here." : "View details of your application."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">
                                Company
                            </Label>
                            <Input
                                id="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <Input
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="salary" className="text-right">
                                Salary
                            </Label>
                            <Input
                                id="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            {isEditing ? (
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="Saved">Saved</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            ) : (
                                <Input
                                    id="status"
                                    value={formData.status}
                                    className="col-span-3"
                                    readOnly
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="source" className="text-right">
                                Source
                            </Label>
                            <Input
                                id="source"
                                value={formData.source}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Time
                            </Label>
                            <Input
                                id="time"
                                type="time"
                                value={formData.time || ''}
                                onChange={handleChange}
                                className="col-span-3"
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between sm:justify-between">
                        {isEditing ? (
                            <>
                                <Button type="button" variant="destructive" onClick={handleDelete} size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <div className="flex gap-2">
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            </>
                        ) : (
                            <Button type="button" onClick={() => setIsEditing(true)}>Edit Details</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
