"use server";

import prisma from "../lib/db";
import slugify from "slugify";

export async function createPost({ title, content }: { title: string; content: string }) {
    if (!title || !content) {
        throw new Error("Title and content are required");
    }

    let slug = slugify(title, { lower: true });

    let existingPost = await prisma.post.findUnique({ where: { slug } });

    let count = 1;
    while (existingPost) {
        slug = `${slug}-${count}`;
        existingPost = await prisma.post.findUnique({ where: { slug } });
        count++;
    }

    const post = await prisma.post.create({
        data: {
            title,
            slug,
            content,
        },
    });

    return post;
}

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
}


