'use client';

import { useState } from 'react';
import { createPost } from '../app/actions/actions'; // Função para criar o post
import { Post } from '@prisma/client';

export default function ModalCreatePost({ onPostCreated }: { onPostCreated: (newPost: Post) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Chama a action para criar o post
        const newPost = await createPost({ title, content });

        // Fecha o modal e atualiza a lista de posts
        closeModal();
        onPostCreated(newPost); // Atualiza a lista de posts no componente pai
    }

    return (
        <>
            <button onClick={openModal} className="bg-green-500 py-2 px-4 text-white rounded-sm">
                Novo Post
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-[300px]">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Criar Novo Post</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título"
                                className="px-2 py-1 rounded-sm bg-gray-100 text-black"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                placeholder="Conteúdo"
                                className="px-2 py-1 rounded-sm bg-gray-100 text-black"
                            />
                            <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm hover:bg-blue-600">
                                Criar Post
                            </button>
                        </form>

                        <button onClick={closeModal} className="mt-3 p-2 rounded-sm text-white bg-red-500 hover:bg-red-600">Fechar</button>
                    </div>
                </div>
            )}
        </>
    );
}
