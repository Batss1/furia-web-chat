import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

import Avatar from "../assets/images/Perfil.png"

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-screen flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-furia-dark">
      {/* Header fixo */}
      <ChatHeader className="sticky top-0 z-10" />
  
      {/* Área de mensagens rolável */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-furia-neon scrollbar-track-furia-secondary">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? 'justify-end' : 'justify-start'} mb-4`}
            ref={messageEndRef}
          >
            <div className={`flex ${message.senderId === authUser._id ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 max-w-[85%]`}>
              {/* Avatar */}
              <div className="shrink-0">
                <div className="size-10 rounded-full border-2 border-furia-neon overflow-hidden">
                  <img
                    src={message.senderId === authUser._id 
                      ? authUser.profilePic || Avatar 
                      : selectedUser.profilePic || Avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
  
              {/* Conteúdo da mensagem */}
              <div className="flex flex-col gap-1">
                {/* Timestamp */}
                <span className={`text-xs text-gray-400 ${message.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                  {formatMessageTime(message.createdAt)}
                </span>
  
                {/* Bubble */}
                <div className={`
                  p-3 rounded-2xl shadow-lg
                  ${message.senderId === authUser._id
                    ? 'bg-furia-neon text-furia-dark rounded-br-none'
                    : 'bg-furia-secondary text-gray-100 rounded-bl-none'}
                `}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p className="break-words">{message.text}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* Input fixo na parte inferior */}
      <div className="sticky bottom-0 bg-furia-dark border-t border-furia-secondary">
        <MessageInput />
      </div>
    </div>
  );
}
export default ChatContainer;