"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import slugify from "slugify";

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createPost(formData: FormData) {
    // Extrai os valores do FormData
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

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

export async function editPost(formData: FormData, id: string) {
    await prisma.post.update({
        where: { id },
        data: {
            title: formData.get('title') as string,
            slug: slugify(formData.get('title') as string, { lower: true }),
            content: formData.get('content') as string,
        },
    });
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/posts');
}
