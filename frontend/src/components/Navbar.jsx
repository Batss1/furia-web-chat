import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import FuriaLogo from '../assets/images/Furia-Logo.svg';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-40 backdrop-blur-lg bg-black/80 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo e título */}
        <Link to="/" className="flex items-center space-x-0.4">
        {/* miniatura da Logo Furia */}
        <img
          src={FuriaLogo}
          alt="Logo Furia"
          className="w-25 h-25"
        />
        <span className="text-white font-bold">FURIA Chat</span>
      </Link>

        {/* Navegação */}
        <nav aria-label="Main navigation" className="flex items-center space-x-4">

          {authUser && (
            <>  
              <Link
                to="/profile"
                className="text-white text-sm font-medium hover:text-yellow-500 transition-colors flex items-center space-x-1"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="text-white text-sm font-medium hover:text-yellow-500 cursor-pointer transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
