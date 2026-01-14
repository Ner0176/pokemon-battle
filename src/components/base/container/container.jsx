export const Container = ({ children }) => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://cdna.artstation.com/p/assets/images/images/077/352/672/large/flyziken-twitch-bg-pokemon.jpg?1719247264')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full h-full border px-10 py-6">
        <div className="size-full bg-white/80 rounded-2xl px-6 py-4 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};
