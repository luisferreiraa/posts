'use client';

import { useState } from 'react';
import ModalCreatePost from './ModalCreatePost';
import { Post } from '@prisma/client';

export default function PostList({ posts }: { posts: Post[] }) {
    const [postsList, setPostsList] = useState(posts);

    // Função para adicionar o novo post à lista
    const handlePostCreated = (newPost: Post) => {
        setPostsList((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <div>
            <ul>
                {postsList.map((post) => (
                    <li key={post.id} className="mb-4">
                        <a href={`/posts/${post.slug}`} className="text-xl font-semibold">
                            {post.title}
                        </a>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>

            {/* Modal de criação de post */}
            <ModalCreatePost onPostCreated={handlePostCreated} />
        </div>
    );
}
