const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <aside className="h-screen hidden lg:flex items-center justify-center bg-[#1f1f1f] p-12">
      <section className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-[#FFD700]/20 ${i % 2 === 0 ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>

        <header className="mb-4">
          <h2 className="text-2xl font-bold text-[#FFD700]" aria-label="Título motivacional">
            {title}
          </h2>
        </header>

        <p className="text-[#fff]/80" aria-label="Subtítulo motivacional">{subtitle}</p>
      </section>
    </aside>
  );
};

export default AuthImagePattern;