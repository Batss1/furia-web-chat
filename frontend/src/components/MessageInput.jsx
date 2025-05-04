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
    removeImage();
  };

  return (
    <footer
      role="contentinfo"
      className="bg-gray-900 border-t border-gray-700 p-4 space-y-4"
    >
      {/* Preview de imagem anexada */}
      {imagePreview && (
        <figure className="relative w-24 h-24 mx-auto">
          <img
            src={imagePreview}
            alt="Pré-visualização do anexo"
            className="w-full h-full object-cover rounded-lg border-2 border-gray-700"
          />
          <button
            type="button"
            onClick={removeImage}
            aria-label="Remover imagem anexada"
            className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] text-black rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <figcaption className="sr-only">Pré-visualização do anexo</figcaption>
        </figure>
      )}

      {/* Formulário de envio de mensagem */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2">
          <label
            htmlFor="message-input"
            className="sr-only"
          >
            Mensagem de texto
          </label>
          <input
            id="message-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite uma mensagem ou /comando"
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />

          <input
            id="attachment"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="sr-only"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Anexar imagem"
            className="ml-2 text-[#FFD700] hover:text-[#E6C200] transition"
          >
            <Image className="w-6 h-6" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-[#FFD700] hover:bg-[#E6C200] p-3 rounded-full disabled:opacity-50 transition"
          aria-label="Enviar mensagem"
        >
          <Send className="w-6 h-6 text-black" />
        </button>
      </form>
    </footer>
  );
};

export default MessageInput;
