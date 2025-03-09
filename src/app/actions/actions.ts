"use server";

import prisma from "../lib/db";
import slugify from "slugify";

export async function createPost(formData: FormData) {
    // Obtém os dados do formulário
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // Cria o slug a partir do título
    let slug = slugify(title, { lower: true });

    // Verifica se já existe um post com o mesmo slug na base de dados
    let existingPost = await prisma.post.findUnique({ where: { slug } });

    let count = 1;
    // Se existir, incrementa um número ao final do slug
    while (existingPost) {
        slug = `${slug}-${count}`;
        existingPost = await prisma.post.findUnique({ where: { slug } });
        count++;
    }

    // Criar o post na base de dados com o título, slug e conteúdo
    const post = await prisma.post.create({
        data: {
            title,
            slug,
            content,
        },
    });

    return post;
}
