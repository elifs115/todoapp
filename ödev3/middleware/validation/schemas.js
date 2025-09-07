import { z } from "zod";


export const paramsSchema = z.object({
  id: z.string().refine(val => !isNaN(parseInt(val, 10)), {
    message: "ID must be a numeric string",
  }).transform(val => parseInt(val, 10)),
});

// user
export const createUserSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required" }).min(3, "Username must be at least 3 characters"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
  }),
});

// todo
export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    description: z.string({ required_error: "Description is required" }).min(1),
    userId: z.number({ required_error: "userId is required" }).int().positive(),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    description: z.string({ required_error: "Description is required" }).min(1),
    completed: z.boolean({ required_error: "Completed status is required" }),
  }),
});

export const patchTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  }),
});

// query
export const todoQuerySchema = z.object({
  query: z.object({
    completed: z.enum(['true', 'false']).optional(),
    q: z.string().optional(),
    page: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Page must be a positive number" }).optional().transform(val => val ? parseInt(val, 10) : undefined),
    limit: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Limit must be a positive number" }).optional().transform(val => val ? parseInt(val, 10) : undefined),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});