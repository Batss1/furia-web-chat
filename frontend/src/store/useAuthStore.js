import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');

            set({ authUser: response.data });
        } catch (error) {
            console.log("Erro ao verificar autenticação:", error);
            set({ authUser: null });
            
        } finally {
            set({ isCheckingAuth: false });
        }
    }, 
    
    signup: async (data) => {
        set ({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            toast.sucess("Cadastro realizado com sucesso!");
            set({ authUser: response.data }); 
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Erro ao cadastrar:", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

}));