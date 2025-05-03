import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    await sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <footer className="bg-white p-4 flex flex-col space-y-3">
      {imagePreview && (
        <div className="flex items-center">
          <figure className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove a imagem"
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </figure>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite uma mensagem ou comando(/comando)"
            className="flex-1 bg-transparent outline-none"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Anexar imagem"
            className="ml-2 text-yellow-500 hover:text-yellow-600 transition"
          >
            <Image className="w-6 h-6" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-2 disabled:opacity-50 transition"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </footer>
  );
};

export default MessageInput;
