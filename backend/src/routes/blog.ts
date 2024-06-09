import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { idSchema, blogSchema, blogUpdateSchema } from '@manojnoochila/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        authorId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const token = c.req.header('Authorization');
    if (!token) {
        c.status(401);
        return c.json({ error: 'unauthorized' });
    } else {
        const key = token.split(' ')[1];
        const { id } = await verify(key, c.env.JWT_SECRET);
        c.set('authorId', String(id));
        await next();
    }
});

blogRouter.get("/myblogs", async (c) => {
    const id = c.get('authorId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: id,
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });
        if (posts.length === 0) {
            return c.json({ message: "No blogs found" });
        }
        return c.json({ posts });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while fetching posts' });
    } finally {
        await prisma.$disconnect();
    }
})


blogRouter.get('/:id', async (c) => {
    const params = idSchema.safeParse(c.req.param());
    if (!params.success) {
        c.status(400);
        return c.json({ error: 'Invalid ID', details: params.error.errors });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author:
                {
                    select: {
                        id: true,
                        name: true,
                    }
                }

            },
            where: {
                id: params.data.id,
            },
        });

        return c.json({ blog });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while finding blog' });
    } finally {
        await prisma.$disconnect();
    }
});

blogRouter.delete('/:id', async (c) => {
    const params = idSchema.safeParse(c.req.param());
    if (!params.success) {
        c.status(400);
        return c.json({ error: 'Invalid ID', details: params.error.errors });
    }

    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } },
    });

    try {
        const updateResult = await prisma.post.update({
            where: {
                id: params.data.id,
            },
            data: {
                published: false,
            },
        });

        if (updateResult) {
            return c.json({ message: "blog deleted successfully" });
        } else {
            c.status(404);
            return c.json({ error: 'Blog not found' });
        }
    } catch (e) {
        c.status(500);
        console.log(e);
        return c.json({ error: 'Error while deleted blog' });
    } finally {
        await prisma.$disconnect();
    }
});
blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },

            include: {
                author: {
                    select: {

                        name: true,
                    }
                }
            }
        });

        return c.json({ posts });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while fetching posts' });
    } finally {
        await prisma.$disconnect();
    }
});


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.get('authorId');
        const body = await c.req.json();

        const parsedBody = blogSchema.safeParse(body);
        if (!parsedBody.success) {
            c.status(400);
            return c.json({ error: 'Invalid input', details: parsedBody.error.errors });
        }

        const blog = await prisma.post.create({
            data: {
                title: parsedBody.data.title,
                content: parsedBody.data.content,
                authorId: String(id),
                published: Boolean(parsedBody.data.published),
            },
            select: {
                id: true,
                title: true,
                content: true,
            },
        });

        return c.json({ posts: blog });
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({ error: 'error while creating blog' });
    } finally {
        await prisma.$disconnect();
    }
});



blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const authorId = c.get('authorId');
        const body = await c.req.json();

        const parsedBody = blogUpdateSchema.safeParse(body);
        if (!parsedBody.success) {
            c.status(400);
            return c.json({ error: 'Invalid input', details: parsedBody.error.errors });
        }

        const updateData: Partial<typeof parsedBody.data> = {};
        if (parsedBody.data.title !== undefined) updateData.title = parsedBody.data.title;
        if (parsedBody.data.content !== undefined) updateData.content = parsedBody.data.content;
        if (parsedBody.data.published !== undefined) updateData.published = Boolean(parsedBody.data.published);

        const blog = await prisma.post.update({
            data: updateData,
            where: {
                id: parsedBody.data.postId,
                authorId: authorId,
            },
        });

        if (!blog) {
            c.status(404);
            return c.json({ error: 'blog not found or you do not have permission to update' });
        }

        return c.json({ message: 'blog updated successfully', blog });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ error: 'error while updating blog' });
    } finally {
        await prisma.$disconnect();
    }
});