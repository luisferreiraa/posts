'use client';

import { useState } from 'react';
import ModalCreatePost from './ModalCreatePost';
import { Post } from '@prisma/client';
import { deletePost } from '@/app/actions/actions';

export default function PostList({ posts }: { posts: Post[] }) {
    const [postsList, setPostsList] = useState(posts);

    // Função para adicionar o novo post à lista
    const handlePostCreated = (newPost: Post) => {
        setPostsList((prevPosts) => [newPost, ...prevPosts]);
    };

    // Função para remover o post da lista
    const handlePostDeleted = (id: string) => {
        setPostsList((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }

    const deletePostAction = async (id: string) => {
        try {
            await deletePost(id);
            handlePostDeleted(id);
        }
        catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className='flex flex-col gap-y-4'>
            <ul>
                {postsList.map((post) => (
                    <li key={post.id} className="mb-4 flex justify-between items-center">
                        <div className="flex-1">
                            {/* Coluna com os dados do post */}
                            <a href={`/posts/${post.slug}`} className="text-xl font-semibold underline">
                                {post.title}
                            </a>
                            <p>{post.content}</p>
                        </div>

                        <div className="ml-4">
                            {/* Coluna com o botão */}
                            <button
                                className="bg-red-500 p-1 rounded-sm text-white hover:bg-red-600"
                                onClick={() => deletePostAction(post.id)}
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal de criação de post */}
            <ModalCreatePost onPostCreated={handlePostCreated} />
        </div>
    );
}
