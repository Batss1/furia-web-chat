import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

import ImgPerfil from "../assets/images/Perfil.png"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 bg-black/10 flex flex-col transition-all duration-200">
      {/* Cabeçalho */}
      <header className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-yellow-500" />
          <h2 className="hidden lg:block text-white font-medium">Contatos</h2>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-checkbox h-4 w-4 text-yellow-500"
            />
            <span className="text-white">Mostrar apenas ativos</span>
          </label>
          <span className="text-xs text-gray-400">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </header>

      {/* Lista de usuários */}
      <nav aria-label="Contatos de usuários" className="overflow-y-auto flex-1 py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-black/20 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-black/20 ring-1 ring-yellow-500"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || ImgPerfil}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <p className="font-medium text-white truncate">{user.fullName}</p>
              <p className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 py-4">Nenhum usuário online</p>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;