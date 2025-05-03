const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <aside className="h-screen hidden lg:flex items-center justify-center bg-[#000000] p-12">
        <section className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={
                  `aspect-square rounded-2xl bg-[#fad600]/20 ${
                    i % 2 === 0 ? 'animate-pulse' : ''
                  }`
                }
              />
            ))}
          </div>
  
          <header className="mb-4">
            <h2 className="text-2xl font-bold text-[#fad600]">{title}</h2>
          </header>
  
          <p className="text-white/80">{subtitle}</p>
        </section>
      </aside>
    );
  };
  
  export default AuthImagePattern;