import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 bg-black flex flex-col transition-all duration-200">
      <header className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-yellow-500" />
          <h2 className="hidden lg:block text-white font-medium">Contatos</h2>
        </div>
      </header>
      <nav aria-label="Loading contacts" className="overflow-y-auto flex-1 py-3">
        {skeletonItems.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center gap-3 animate-pulse"
          >
            {/* Esqueleto do Avatar */}
            
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto lg:mx-0" />

            {/* User info skeleton (apenas em telas maiores) */}
            <div className="hidden lg:flex flex-col flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarSkeleton;