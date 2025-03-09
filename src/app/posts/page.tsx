import Link from "next/link";
import prisma from "@/app/lib/db";
import ModalCreatePost from "@/components/ModalCreatePost"; // Importa o modal

export default async function PostsPage() {
    // Obtém todos os posts do banco de dados, ordenados pela data de criação
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "asc" },
    });

    // Obtém a quantidade de posts
    const postsCount = await prisma.post.count();

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            {/* Título da página com o número total de posts */}
            <h1 className="text-3xl font-semibold">All Posts ({postsCount})</h1>

            {/* Lista de posts recuperados do banco de dados */}
            <ul className="border-t border-b border-white/10 py-5 leading-8">
                {posts.map((post) => (
                    <li key={post.id} className="flex items-center justify-between px-5">
                        <Link href={`/posts/${post.slug}`} className="underline">
                            {/* Link para visualizar cada post individualmente */}
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Modal com form para adicionar um post */}
            <ModalCreatePost />
        </main>
    );
}