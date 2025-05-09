import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main role="main" className="h-screen grid lg:grid-cols-2 bg-black text-white">
      {/* Formulário de Login */}
      <section
        role="region"
        aria-labelledby="login-title"
        className="flex items-center justify-center bg-gray-900 p-6 sm:p-12"
      >
        <article className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md space-y-8">
          <header className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFD700]/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h1 id="login-title" className="mt-4 text-2xl font-bold">
              Bem-vindo de Volta
            </h1>
            <p className="text-gray-400 mt-2">Conecte-se à sua conta</p>
          </header>

          <form onSubmit={handleSubmit} aria-describedby="login-desc" className="space-y-6">
            <fieldset className="space-y-4">
              <legend id="login-desc" className="sr-only">
                Formulário de login
              </legend>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Mostrar ou ocultar senha"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2 rounded-md bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold transition disabled:opacity-50"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  Carregando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <footer className="text-center">
            <p className="text-gray-400">
              Não possui conta?{" "}
              <Link to="/signup" className="text-[#FFD700] hover:underline">
                Criar conta
              </Link>
            </p>
          </footer>
        </article>
      </section>

      {/* Padrão gráfico decorativo */}
      <aside role="complementary">
        <AuthImagePattern
          title="Boas-vindas de volta!"
          subtitle="Faça login para continuar suas conversas e ficar por dentro das novidades."
        />
      </aside>
    </main>
  );
};
export default LoginPage;
