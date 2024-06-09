"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogFrontendSchema = exports.blogUpdateSchema = exports.blogSchema = exports.idSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    published: zod_1.z.boolean().optional(),
});
exports.blogUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1).optional(),
    published: zod_1.z.boolean().optional(),
    postId: zod_1.z.string().min(1),
});
exports.blogFrontendSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    published: zod_1.z.boolean().optional(),
    createdAt: zod_1.z.string().min(1),
    authorId: zod_1.z.string().min(1),
    author: zod_1.z.object({
        name: zod_1.z.string().min(1),
    })
});
