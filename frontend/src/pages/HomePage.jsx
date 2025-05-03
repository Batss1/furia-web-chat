import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="min-h-screen bg-black/5 pt-20">
      <section className="flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl h-[calc(100vh-5rem)] overflow-hidden">
          <div className="flex h-full">
            <aside className="w-1/4 bg-black/10">
              <Sidebar />
            </aside>
            <section className="flex-1">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
