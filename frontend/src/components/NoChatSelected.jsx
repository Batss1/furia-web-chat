import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <main
      role="main"
      className="flex-1 flex items-center justify-center bg-gray-900 p-16">
      <article className="max-w-md flex flex-col text-center space-y-6">
        <figure className="mx-auto">
          <div
            className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center animate-bounce"
            aria-hidden="true"
          >
            <MessageSquare className=" w-8 h-8 text-[#FFD700]" />
          </div>
          <figcaption className="sr-only">
            Ícone de chat animado indicando que nenhuma conversa está selecionada
          </figcaption>
        </figure>

        <header>
          <h2 className="text-2xl font-bold text-white">
            Bem-vindo ao FURIA Chat
          </h2>
        </header>

        <p className="text-gray-400">
          Selecione uma conversa para começar a digitar
        </p>
      </article>
    </main>
  );
};

export default NoChatSelected;
