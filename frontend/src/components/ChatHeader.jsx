import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Avatar from "../assets/images/Perfil.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header
      role="banner"
      className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700 text-white"
    >
      {/* Informações do usuário */}
      <div role="group" aria-label="Informações do contato" className="flex items-center gap-3">
        <figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFD700]">
          <img src={selectedUser.profilePic || Avatar } alt={`Foto de perfil de ${selectedUser.fullName}`}
            className="w-full h-full object-cover"/>
        
        </figure>
        <div>
          <h2 className="text-lg font-semibold">{selectedUser.fullName}</h2>
          <p className={`text-sm ${ isOnline ? "text-[#FFD700]" : "text-gray-500" }`} aria-live="polite">

            {isOnline ? "Online" : "Offline"}
          
          </p>
        </div>
      </div>

      {/* Botão para fechar o chat */}
      <button onClick={() => setSelectedUser(null)} aria-label="Fechar chat"
        className="text-gray-500 hover:text-[#FFD700] transition-colors">
        <X className="w-5 h-5" />
      
      </button>
    </header>
  );
};

export default ChatHeader;
