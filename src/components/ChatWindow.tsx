export default function ChatWindow() {
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
              {/* Mensagens serão adicionadas aqui */}
            </div>
          </div>
        );
    }