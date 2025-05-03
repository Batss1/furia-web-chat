import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header className="flex items-center justify-between p-4 bg-black/5 border-b border-gray-700">

      {/* Avatar e informações do usuário */}

      <div className="flex items-center gap-3">
        <figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-full h-full object-cover"
          />
        </figure>
        <div>
          <h2 className="text-lg font-medium text-black">{selectedUser.fullName}</h2>
          <p className={`text-sm ${isOnline ? "text-yellow-500" : "text-gray-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Botão de fechar chat */}
      
      <button
        onClick={() => setSelectedUser(null)}
        aria-label="Close chat"
        className="text-gray-500 hover:text-black transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </header>
  );
};

export default ChatHeader;
