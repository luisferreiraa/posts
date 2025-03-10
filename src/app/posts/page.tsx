import prisma from "@/app/lib/db";
import PostList from "@/components/PostList";
import { getPosts } from "../actions/actions";

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <main className="container mx-auto pt-10">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>

            {/* Passa os posts para o componente CSR */}
            <PostList posts={posts} />
        </main>
    );
}