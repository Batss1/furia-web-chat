const MessageSkeleton = () => {
    const skeletonItems = Array.from({ length: 6 });
  
    return (
      <section aria-label="Loading messages" className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/5">
        {skeletonItems.map((_, idx) => {
          const isMine = idx % 2 === 0;
          return (
            <article
              key={idx}
              className={`flex items-start ${isMine ? "justify-end" : "justify-start"}`}
            >
              <figure className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
  
              <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} ms-2 space-y-2`}>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
                <div className="h-16 w-48 bg-gray-300 rounded animate-pulse" />
              </div>
            </article>
          );
        })}
      </section>
    );
  };
  
  export default MessageSkeleton;