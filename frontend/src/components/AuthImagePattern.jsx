const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <aside
      role="complementary"
      aria-label="Padrão de imagens decorativas"
      className="hidden lg:flex h-screen items-center justify-center bg-black p-12"
    >
      <article className="max-w-md text-center">
        <figure className="mb-8" aria-hidden="true">
          <ul className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <li
                key={i}
                className={`aspect-square rounded-2xl bg-[#FFD700]/20 ${
                  i % 2 === 0 ? 'animate-pulse' : ''
                }`}
              />
            ))}
          </ul>
        </figure>

        <header className="mb-4">
          <h2
            className="text-2xl font-bold text-[#FFD700]"
            aria-label="Título motivacional"
          >
            {title}
          </h2>
        </header>

        <p className="text-white/80" aria-label="Subtítulo motivacional">
          {subtitle}
        </p>
      </article>
    </aside>
  );
};

export default AuthImagePattern;