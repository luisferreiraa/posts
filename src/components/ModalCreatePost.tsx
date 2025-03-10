"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createPost } from "../app/actions/actions";
import Form from "next/form";
import { Post } from "@prisma/client";

export default function ModalCreatePost({ onPostCreated }: { onPostCreated: (newPost: Post) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null); // Estado para gerenciar erros

    // Criamos uma função intermediária para adaptar `createPost`
    const createPostAction = async (_state: any, formData: FormData) => {
        try {
            const newPost = await createPost(formData);
            onPostCreated(newPost);
            closeModal();
        } catch (error: any) {
            setError(error.message); // Definimos a mensagem de erro no estado
        }
    };

    // Usamos o hook `useActionState` para criar o estado
    const [state, formAction] = useActionState(createPostAction, null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setError(null); // Limpa o erro quando o modal é fechado
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

                        <Form action={formAction} className="flex flex-col gap-y-2">
                            <input name="title" placeholder="Título" className="px-2 py-1 rounded-sm bg-gray-100 text-black" required />
                            <textarea name="content" rows={5} placeholder="Conteúdo" className="px-2 py-1 rounded-sm bg-gray-100 text-black" required />
                            <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm hover:bg-blue-600">
                                Criar Post
                            </button>
                        </Form>

                        {/* Mensagem de erro, se houver */}
                        {error && <p className="text-red-500">{error}</p>}

                        <button onClick={closeModal} className="mt-3 p-2 rounded-sm text-white bg-red-500 hover:bg-red-600">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
