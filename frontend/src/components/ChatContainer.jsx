import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

import ImgPerfil from "../assets/images/Perfil.png"

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
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <section className="flex-1 flex flex-col overflow-auto bg-black/5">
        <header>
          <ChatHeader />
        </header>
        <MessageSkeleton />
        <footer>
          <MessageInput />
        </footer>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col overflow-auto">
      <header>
        <ChatHeader />
      </header>

      <section
        aria-live="polite"
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((message) => {
          const isMine = message.senderId === authUser._id;
          return (
            <article
              key={message._id}
              className={`flex items-start ${isMine ? "justify-end" : "justify-start"}`}
            >
              <figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={
                    isMine
                      ? authUser.profilePic || ImgPerfil
                      : selectedUser.profilePic || ImgPerfil
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </figure>

              <div
                className={`flex flex-col ms-2 space-y-1 ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <time className="text-xs text-gray-400">
                  {formatMessageTime(message.createdAt)}
                </time>

                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl ${
                    isMine
                      ? "bg-yellow-500/20 text-black"
                      : "bg-white text-black"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="mb-2 rounded-md max-w-xs"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </article>
          );
        })}
        <div ref={messageEndRef} />
      </section>

      <footer className="bg-white p-4">
        <MessageInput />
      </footer>
    </section>
  );
};

export default ChatContainer;
