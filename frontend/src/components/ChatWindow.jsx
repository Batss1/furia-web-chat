import { useEffect, useState, useRef } from 'react';
import MessageInput from './MessageInput';
import useSocket from '../hooks/useSocket';



export default function ChatWindow() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot?: boolean} >> ([]);
  
  const socket = useSocket('http://localhost:3001');

  const handleSend = (text: string) => {
    if (socket) {
      socket.emit('message', { text, isBot: false});
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('🔌 Conectado ao servidor Socket.IO');
    });
  
    // Ouvir mensagens
    socket.on('message', (message: { text: string; isBot?: boolean }) => {
      console.log('📬 Nova mensagem:', message);
      setMessages(prev => [...prev, message]);
    });
  
    // Tratar erros
    socket.on('connect_error', (err) => {
      console.error('Erro de conexão:', err);
    });
  
    return () => {
      socket.off('message');
      socket.off('connect_error');
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
 

        return (

          <div className="h-screen flex flex-col">
            <header className="p-4 border-b border-furia-red">
            <h1 className="text-2xl text-furia-red font-furia">
              <img 
                  src="src\assets\images\Furia-Logo.svg" 
                  className="h-8 inline-block mr-2" 
                  alt="FURIA Logo" 
              />
              FURIA CHAT 🔥
            </h1>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              <MessageInput onSend={handleSend} />
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${message.isBot ? 'bg-gray-800 text-white' : 'bg-furia-red text-white'}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
              

            </div>
          </div>

        );
    }