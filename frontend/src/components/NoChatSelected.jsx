import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <main className="flex flex-1 items-center justify-center bg-black/5 p-16">
      <article className="max-w-md text-center space-y-6">
        <figure>
          <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/20 flex items-center justify-center animate-bounce">
            <MessageSquare className="w-8 h-8 text-yellow-500" />
          </div>
          <figcaption className="sr-only">Ícone de chat animado</figcaption>
        </figure>

        <header>
          <h2 className="text-2xl font-bold text-black">Bem-vindo ao FURIA-Chat</h2>
        </header>

        <p className="text-gray-600">
        Selecione uma conversa para começar a digitar
        </p>
      </article>
    </main>
  );
};

export default NoChatSelected;
