import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Nome completo é obrigatório");
    if (!formData.email.trim()) return toast.error("Email é obrigatório");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Formato de email inválido");
    if (!formData.password) return toast.error("Senha é obrigatória");
    if (formData.password.length < 6) return toast.error("Senha deve ter pelo menos 6 caracteres");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Formulário de cadastro */}
      <section className="flex justify-center items-center bg-black p-6 sm:p-12">
        <article className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full space-y-8">
          <header className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/20 flex justify-center items-center">
              <MessageSquare className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 id="signup-title" className="mt-4 text-2xl font-bold text-black">Criar Conta</h1>
            <p className="text-gray-600 mt-2">Comece com sua conta gratuita</p>
          </header>

          <form onSubmit={handleSubmit} aria-labelledby="signup-title" className="space-y-6">
            <fieldset className="space-y-4">
              <legend className="sr-only">Sign up form</legend>

              {/* Nome completo */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Botão de envio */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Carregando...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <footer className="text-center">
            <p className="text-gray-600">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-yellow-500 hover:underline">
                Sign in
              </Link>
            </p>
          </footer>
        </article>
      </section>

      {/* Conteúdo complementar */}
      <aside>
        <AuthImagePattern
          title="Faça parte da nossa comunidade!"
          subtitle="Conecte-se com amigos, compartilhe os melhores momentos da Furia e mantenha-se informado sobre partidas."
        />
      </aside>
    </main>
  );
};

export default SignUpPage;
