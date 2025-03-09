import prisma from "@/app/lib/db";

export default async function PostPage({ params }: { params: { slug: string } }) {
    // Garantir que 'slug' está a ser passado
    const { slug } = params;

    if (!slug) {
        return <p>Erro: Nenhum slug fornecido!</p>;
    }

    // Busca do post no banco de dados com o slug
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
    });

    // Caso o post não seja encontrado
    if (!post) {
        return <p>Post não encontrado!</p>;
    }

    // Retorno da página com o conteúdo do post
    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <p>{post.content}</p>
        </main>
    );
}


