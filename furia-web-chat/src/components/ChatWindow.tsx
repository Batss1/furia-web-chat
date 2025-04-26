import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import useSocket from '../hooks/useSocket';



export default function ChatWindow() {
  const socket = useSocket('http://localhost:3001');

  const [messages, setMessages] = useState<Array<{ text: string; isBot?: boolean} >> ([]);

  const handleSend = (text: string) => {
    if (socket) {
      socket.emit('message', { text, isBot: false});
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message: { text: string; isBot?: boolean }) => {
      setMessages(prev => [...prev, message]);
    });
  }, [socket]);
 

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
            </div>
          </div>

        );
    }