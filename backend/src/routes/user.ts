import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { signupSchema, signinSchema } from '@manojnoochila/medium-common';
import bcrypt from 'bcryptjs';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        HASH_SALT_ROUNDS: string,
    },
}>();





userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
        c.status(400);
        return c.json({ error: parsedBody.error.errors.map(err => err.message) });
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedBody.data.password, parseInt(c.env.HASH_SALT_ROUNDS));
        const user = await prisma.user.create({
            data: {
                email: parsedBody.data.email,
                password: hashedPassword,
                name: parsedBody.data.name,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token, name: user.name });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while signing up' });
    } finally {
        await prisma.$disconnect();
    }
});

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const parsedBody = signinSchema.safeParse(body);
    if (!parsedBody.success) {
        c.status(400);
        return c.json({ error: parsedBody.error.errors.map(err => err.message) });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: parsedBody.data.email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });

        if (!user || !(await bcrypt.compare(parsedBody.data.password, user.password))) {
            c.status(403);
            return c.json({ error: 'user not found or invalid password' });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token, name: user.name });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while signing in' });
    } finally {
        await prisma.$disconnect();
    }
});