import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main className="h-screen grid lg:grid-cols-2">
      {/* Seção de formulário */}
      <section className="flex items-center justify-center bg-black p-6 sm:p-12">
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-8">
          <header className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 id="login-title" className="mt-4 text-2xl font-bold text-black">Bem-vindo de Volta</h1>
            <p className="text-gray-600 mt-2">Conecte-se em sua conta</p>
          </header>

          <form onSubmit={handleSubmit} aria-labelledby="login-title" className="space-y-6">
            <fieldset className="space-y-4">
              <legend className="sr-only">Login Form</legend>

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

              {/* Password */}
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Botão de login */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <footer className="text-center">
            <p className="text-gray-600">
              Não possui conta?{' '}
              <Link to="/signup" className="text-yellow-500 hover:underline">
                Criar conta
              </Link>
            </p>
          </footer>
        </article>
      </section>

      {/* Conteúdo complementar */}
      <aside>
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </aside>
    </main>
  );
};

export default LoginPage;
