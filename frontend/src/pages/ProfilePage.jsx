import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import ImgPerfil from "../assets/images/Perfil.png"

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
    <main className="min-h-screen bg-black/5 pt-20">
      <section className="max-w-2xl mx-auto p-4">
        <article className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
          <header className="text-center">
            <h1 className="text-2xl font-semibold text-black">Perfil</h1>
            <p className="text-gray-600 mt-1">Informações do perfil</p>
          </header>

          {/* Seção de avatar */}
          <section className="flex flex-col items-center gap-4">
            <figure className="relative">
              <img
                src={selectedImg || authUser.profilePic || ImgPerfil}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label htmlFor="avatar-upload" className={
                `absolute bottom-0 right-0 bg-yellow-500/20 p-2 rounded-full cursor-pointer transition-transform duration-200 flex items-center justify-center ${
                  isUpdatingProfile ? 'animate-pulse pointer-events-none' : 'hover:scale-110'
                }`
              }>
                <Camera className="w-5 h-5 text-yellow-500" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                  className="hidden"
                />
              </label>
            </figure>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera to update your photo'}
            </p>
          </section>

          {/* Dados básicos */}
          <section className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </div>
              <p className="px-4 py-2 bg-gray-100 rounded-lg border text-black">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </div>
              <p className="px-4 py-2 bg-gray-100 rounded-lg border text-black">
                {authUser?.email}
              </p>
            </div>
          </section>

          {/* Informações da conta */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-medium text-black mb-4">Account Information</h2>
            <dl className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-200 py-2">
                <dt>Member Since</dt>
                <dd>{authUser.createdAt?.split('T')[0]}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt>Account Status</dt>
                <dd className="text-green-500">Active</dd>
              </div>
            </dl>
          </section>
        </article>
      </section>
    </main>
  );
};

export default ProfilePage;
