import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: z.string().min(1, { message: "Name cannot be empty" }),
});
export const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const idSchema = z.object({
    id: z.string().min(1),
});


export const blogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    published: z.boolean().optional(),
});

export const blogUpdateSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    published: z.boolean().optional(),
    postId: z.string().min(1),
});

export const blogFrontendSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    published: z.boolean().optional(),
    createdAt: z.string().min(1),
    authorId: z.string().min(1),
    author: z.object({
        name: z.string().min(1),
    })
});



export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type IdSchema = z.infer<typeof idSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>;
export type BlogFrontendSchema = z.infer<typeof blogFrontendSchema>;





