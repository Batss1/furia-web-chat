import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface MessageInputProps {
    onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [inputMessage, setInputMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            onSend(inputMessage);
            setInputMessage("");
        }
    };

    return(
        <form onSubmit={handleSubmit} className="p-4 border-t border-furia-red">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite uma mensagem ou comando(/ajuda)"
                    className="flex-1 bg-black text-white p-2 rounded-lg border border-furia-red focus:outline-none focus:ring-2 focus:ring-furia-red"
                />
                <button type="submit" className="bg-furia-red text-white p-2 rounded-lg hover:opacity-80 transition-opacity">
                    <PaperAirplaneIcon className="h-6 w-6" />
                </button>
            </div>
        </form>
    );
}