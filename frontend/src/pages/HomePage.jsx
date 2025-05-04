import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        role="region"
        aria-label="Chat Application Layout"
        className="flex items-center justify-center p-4 pt-20"
      >
        <div className="flex w-full max-w-6xl h-[calc(100vh-5rem)] bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Navegação lateral */}
          <nav
            aria-label="Lista de Conversas"
            className="w-1/4 bg-gray-800 border-r border-gray-700"
          >
            <Sidebar />
          </nav>
          
          {/* Área principal de chat */}
          <section
            aria-label="Conteúdo do Chat"
            className="flex-1 bg-gray-900"
          >
            {!selectedUser ? (
              <article className="h-full flex items-center justify-center">
                <NoChatSelected />
              </article>
            ) : (
              <article className="h-full">
                <ChatContainer />
              </article>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default HomePage;