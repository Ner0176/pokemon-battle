import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const FightingPokemon = ({ pokemon, isLoser, variant = "left" }) => {
  const { name, stats, movingSprite, movingBackSprite } = pokemon;

  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    left: "bottom-10 left-50",
    right: "top-10 right-50",
  };

  const animationClass = isLoser
    ? "opacity-0 translate-y-20 scale-90 delay-1000 duration-800"
    : isEntering
    ? "opacity-0 -translate-y-20 scale-90"
    : "opacity-100 translate-y-0 scale-100";

  return (
    <div
      className={`absolute flex flex-row justify-between gap-5 transition-all duration-1000
        ${variants[variant] || variants.left} ${animationClass}`}
    >
      <div className="flex flex-col gap-1 bg-white/80 px-4 py-2 rounded-lg shadow-lg h-fit">
        <span className="font-bold uppercase text-xs">{name}</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-emerald-500 transition-all duration-1000 ${
              isLoser ? "w-0" : "w-full"
            }`}
          />
        </div>
        <div className="flex flex-row items-center gap-1.5">
          {stats.map((item) => (
            <span key={item.name} className="text-[10px]">
              <span>{item.name}:</span> {item.score}
            </span>
          ))}
        </div>
      </div>
      <img
        className="h-20 aspect-square object-contain"
        src={variant === "left" ? movingBackSprite : movingSprite}
      />
    </div>
  );
};

export const BattleTeamInfo = ({
  teamDetails,
  currentPokemon,
  variant = "left",
}) => {
  const { name, team } = teamDetails;

  const variants = {
    left: "left-0 justify-end",
    right: "right-0 justify-start",
  };

  const currentPkmIdx = team.findIndex((pkm) => pkm.id === currentPokemon?.id);

  return (
    <div
      className={`absolute top-0 z-20 h-full bg-white/80 flex flex-col gap-2 items-center px-4 py-3 ${
        variants[variant] || variants.left
      }`}
    >
      <span className="text-sm text-center">{name}</span>
      <div className="grid grid-cols-3 gap-1">
        {team.map(({ staticSprite }, idx) => {
          return (
            <img
              key={idx}
              src={staticSprite}
              className={`h-10 aspect-square object-contain ${
                currentPkmIdx > idx ? "opacity-50" : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const BattleHistoric = ({ history, stageIdx, isAnimating }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white size-full min-h-0 rounded-2xl shadow-sm">
      <span className="text-lg font-bold text-center border-b border-neutral-200 pt-4 pb-2 px-8">
        {t("BattleArena.Historic.Title")}
      </span>
      <div className="flex flex-col size-full overflow-y-auto px-8">
        {history.slice(0, stageIdx + 1).map((event, i) => {
          const showResult = i < stageIdx || !isAnimating;
          return (
            <div
              key={i}
              className="text-sm border-b border-gray-100 py-3 animate-fade-in first:mt-4 last:mb-4 last:border-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-neutral-800 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                  Ronda {i + 1}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-bold text-red-600">
                  {event.pokemonA.name}
                </span>
                <span className="text-xs italic text-gray-400">vs</span>
                <span className="font-bold text-blue-600">
                  {event.pokemonB.name}
                </span>
              </div>
              {showResult ? (
                <div className="mt-2 p-2 bg-neutral-50 rounded-lg animate-in fade-in duration-500">
                  <p className="font-bold">
                    ¡Ganador:{" "}
                    <span
                      style={{
                        color:
                          event.winner === event.pokemonA.name
                            ? "oklch(57.7% 0.245 27.325)"
                            : "#155dfc",
                      }}
                    >
                      {event.winner}
                    </span>
                    !
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {event.reason}
                  </p>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-neutral-50/50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-xs text-gray-400 italic text-center">
                    Combatiendo...
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
