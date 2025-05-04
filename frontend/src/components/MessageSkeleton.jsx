const MessageSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="h-screen flex flex-col bg-furia-dark">
      <div className="sticky top-0 z-10 h-16 bg-furia-dark animate-pulse" />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonItems.map((_, idx) => {
          const isMine = idx % 2 === 0;
          
          return (
            <div
              key={idx}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex ${isMine ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 max-w-[85%]`}>
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="size-10 rounded-full bg-furia-secondary animate-pulse" />
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-1">
                  {/* Timestamp */}
                  <div className={`h-4 w-20 bg-furia-secondary rounded animate-pulse ${isMine ? 'ml-auto' : ''}`} />

                  {/* Bubble */}
                  <div className={`
                    h-16 w-48 rounded-2xl animate-pulse
                    ${isMine
                      ? 'bg-furia-neon/30 rounded-br-none'
                      : 'bg-furia-secondary rounded-bl-none'}
                  `} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 h-20 bg-furia-dark animate-pulse" />
    </div>
  );
};

export default MessageSkeleton;
