import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    status: z.enum(['Todo', 'In Progress', 'Done']),
    priority: z.enum(['Low', 'Medium', 'High']),
    assignee: z.string().optional(),
    dueDate: z.string().optional() // refine as needed for date validation
});
