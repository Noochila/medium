import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const idSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const blogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    published?: boolean | undefined;
}>;
export declare const blogUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}, {
    postId: string;
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}>;
export declare const blogFrontendSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodString;
    authorId: z.ZodString;
    author: z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    authorId: string;
    author: {
        name: string;
    };
    published?: boolean | undefined;
}, {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    authorId: string;
    author: {
        name: string;
    };
    published?: boolean | undefined;
}>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type IdSchema = z.infer<typeof idSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>;
export type BlogFrontendSchema = z.infer<typeof blogFrontendSchema>;
