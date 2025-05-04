import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import ImgPerfil from "../assets/images/Perfil.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <main role="main" className="min-h-screen bg-black text-white pt-20">
      <section
        role="region"
        aria-labelledby="profile-heading"
        className="max-w-2xl mx-auto p-4"
      >
        <article className="bg-gray-900 rounded-2xl shadow-lg p-6 space-y-8">
          <header className="text-center">
            <h1 id="profile-heading" className="text-2xl font-semibold">
              Perfil
            </h1>
            <p className="text-gray-400 mt-1">Informações do perfil</p>
          </header>

          {/* Avatar */}
          <figure className="flex flex-col items-center gap-4">
            <img
              src={selectedImg || authUser.profilePic || ImgPerfil}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
            />
            <figcaption className="text-sm text-gray-400">
              {!isUpdatingProfile
                ? "Clique na câmera para atualizar sua foto"
                : "Enviando..."}
            </figcaption>
            <label
              htmlFor="avatar-upload"
              className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFD700]/20 cursor-pointer transition-transform duration-200 ${
                isUpdatingProfile
                  ? "animate-pulse pointer-events-none"
                  : "hover:scale-110"
              }`}
            >
              <Camera className="w-5 h-5 text-[#FFD700]" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                disabled={isUpdatingProfile}
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
          </figure>

          {/* Dados básicos */}
          <section aria-labelledby="basic-info-heading" className="space-y-6">
            <h2 id="basic-info-heading" className="sr-only">
              Dados básicos
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="flex items-center gap-2 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  Nome completo
                </dt>
                <dd className="mt-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                  {authUser?.fullName}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="w-4 h-4" />
                  Email
                </dt>
                <dd className="mt-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 break-all">
                  {authUser?.email}
                </dd>
              </div>
            </dl>
          </section>

          {/* Informações da conta */}
          <section
            aria-labelledby="account-info-heading"
            className="bg-gray-800 rounded-xl p-6"
          >
            <h2
              id="account-info-heading"
              className="text-lg font-medium mb-4 text-white"
            >
              Informações da Conta
            </h2>
            <dl className="space-y-3 text-sm text-gray-400">
              <div className="flex justify-between border-b border-gray-700 py-2">
                <dt>Membro desde</dt>
                <dd>{authUser.createdAt?.split("T")[0]}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt>Status da conta</dt>
                <dd className="text-green-400">Ativa</dd>
              </div>
            </dl>
          </section>
        </article>
      </section>
    </main>
  );
};

export default ProfilePage;