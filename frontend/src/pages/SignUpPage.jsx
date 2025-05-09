import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Nome completo é obrigatório");
    if (!formData.email.trim())
      return toast.error("Email é obrigatório");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Formato de email inválido");
    if (!formData.password)
      return toast.error("Senha é obrigatória");
    if (formData.password.length < 6)
      return toast.error("Senha deve ter ao menos 6 caracteres");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      signup(formData);
    }
  };

  return (
    <main
      role="main"
      className="min-h-screen grid lg:grid-cols-2 bg-black text-white"
    >
      {/* Formulário de cadastro */}
      <section
        role="region"
        aria-labelledby="signup-title"
        className="flex items-center justify-center bg-gray-900 p-6 sm:p-12"
      >
        <article className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full space-y-8">
          <header className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFD700]/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h1
              id="signup-title"
              className="mt-4 text-2xl font-bold text-white"
            >
              Criar Conta
            </h1>
            <p className="text-gray-400 mt-2">
              Comece com sua conta grátis
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            aria-describedby="signup-desc"
            className="space-y-6"
          >
            <fieldset className="space-y-4">
              <legend id="signup-desc" className="sr-only">
                Formulário de cadastro
              </legend>

              {/* Nome completo */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium"
                >
                  Nome completo
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="João Silva"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                >
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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

            {/* Botão de envio */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#FFD700] hover:bg-[#e6c200] cursor-pointer font-semibold text-black disabled:opacity-50"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  Enviando...
                </div>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <footer className="text-center">
            <p className="text-gray-400">
              Já possui conta?{" "}
              <Link
                to="/login"
                className="text-[#FFD700] hover:underline"
              >
                Entrar
              </Link>
            </p>
          </footer>
        </article>
      </section>

      {/* Lado gráfico decorativo */}
      <aside role="complementary">
        <AuthImagePattern
          title="Faça parte da nossa comunidade!"
          subtitle="Conecte-se com amigos, compartilhe os melhores momentos da Furia e mantenha-se informado sobre partidas."
        />
      </aside>
    </main>
  );
};

export default SignUpPage;