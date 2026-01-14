//import { mdiPokeball } from "@mdi/js";
import { mdiHomeOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { label: "Inicio", path: "/", icon: mdiHomeOutline },
  // { label: "Equipos", path: "/team-builder", icon: mdiPokeball },
];

export const Container = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://cdna.artstation.com/p/assets/images/images/077/352/672/large/flyziken-twitch-bg-pokemon.jpg?1719247264')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full h-full border px-10 pt-12 pb-4">
        <div className="relative size-full bg-white/80 rounded-2xl rounded-tl-none px-6 pt-4 shadow-md">
          <div className="absolute left-0 top-0 -translate-y-full z-10 flex flex-row rounded-t-xl border border-neutral-200 overflow-hidden">
            {TABS.map(({ icon, path, label }, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => navigate(path)}
                  className="flex flex-row items-center gap-1 px-4 py-1 cursor-pointer bg-white/90 border-r border-neutral-300 last:border-r-0 hover:bg-neutral-50"
                >
                  <Icon path={icon} className="size-4" />
                  <span className="text-sm">{label}</span>
                </div>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
