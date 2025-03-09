"use client";

import { useState } from "react";
import { createPost } from "../app/actions/actions";

export default function ModalCreatePost() {
    // Estado para controlar a abertura e fechamento do modal
    const [isOpen, setIsOpen] = useState(false);

    // Funções para abrir o modal
    function openModal() {
        setIsOpen(true);
    }

    // Função para fechar o modal e recarregar a página para atualizar a lista de posts
    function closeModal() {
        setIsOpen(false);
        window.location.reload();
    }

    return (
        <>
            {/* Botão para abrir o modal */}
            <button onClick={openModal} className="bg-green-500 py-2 px-4 text-white rounded-sm">
                Novo Post
            </button>

            {/* Exibe o modal apenas se isOpen for true */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-[300px]">
                        <h2 className="text-xl font-bold mb-3">Criar Novo Post</h2>

                        {/* Formulário para criar um post */}
                        <form
                            action={async (formData) => {
                                await createPost(formData);
                                closeModal();
                            }}
                            className="flex flex-col gap-y-2"
                        >
                            {/* Campo para o título do post */}
                            <input
                                type="text"
                                name="title"
                                placeholder="Título"
                                className="px-2 py-1 rounded-sm bg-gray-100 text-black"
                            />
                            {/* Campo para o conteúdo do post */}
                            <textarea
                                name="content"
                                rows={5}
                                placeholder="Conteúdo"
                                className="px-2 py-1 rounded-sm bg-gray-100 text-black"
                            />
                            {/* Botão para submeter o formulário */}
                            <button
                                type="submit"
                                className="bg-blue-500 py-2 text-white rounded-sm"
                            >
                                Criar Post
                            </button>
                        </form>

                        {/* Botão para fechar o modal manualmente */}
                        <button onClick={closeModal} className="mt-3 text-red-500">Fechar</button>
                    </div>
                </div>
            )}
        </>
    );
}
