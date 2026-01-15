import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const FightingPokemon = ({ pokemon, isLoser, variant = "left" }) => {
  const { name, types, movingSprite, movingBackSprite } = pokemon;

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
      <div className="flex flex-col gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-lg h-fit">
        <div className="flex flex-row items-center gap-3">
          <span className="font-bold uppercase text-xs">{name}</span>
          <div className="flex gap-1">
            {types.map(({ name, sprite }) => (
              <img key={name} src={sprite} className="h-3" alt="Pokemon type" />
            ))}
          </div>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-emerald-500 transition-all duration-1000 ${
              isLoser ? "w-0" : "w-full"
            }`}
          />
        </div>
      </div>
      <div className="h-20 w-fit">
        <img
          className="size-full object-contain"
          src={variant === "left" ? movingBackSprite : movingSprite}
        />
      </div>
    </div>
  );
};

export const BattleTeamInfo = ({ variant = "left", teamDetails }) => {
  const { name, team } = teamDetails;

  const variants = {
    left: "left-0 justify-end",
    right: "right-0 justify-start",
  };

  return (
    <div
      className={`absolute top-0 z-20 h-full bg-white/80 flex flex-col gap-2 items-center px-4 py-3 ${
        variants[variant] || variants.left
      }`}
    >
      <span className="text-sm text-center">{name}</span>
      <div className="grid grid-cols-3 gap-1">
        {team.map(({ staticSprite }) => (
          <div className="h-10 w-fit">
            <img src={staticSprite} className="size-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const BattleHistoric = ({ history, stageIdx, isAnimating }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white w-full h-full rounded-2xl py-4 px-8 overflow-y-auto shadow-sm">
      <span className="text-lg font-bold text-center mb-4 border-b pb-2">
        {t("BattleArena.Historic.Title")}
      </span>
      {history.slice(0, stageIdx + 1).map((event, i) => {
        const showResult = i < stageIdx || !isAnimating;
        return (
          <div
            key={i}
            className="text-sm border-b border-gray-100 py-3 animate-fade-in last:border-none"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-neutral-800 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                Ronda {i + 1}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span className="font-bold">{event.pokemonA.name}</span>
              <span className="text-xs italic text-gray-400">vs</span>
              <span className="font-bold">{event.pokemonB.name}</span>
            </div>
            {showResult ? (
              <div className="mt-2 p-2 bg-neutral-50 rounded-lg animate-in fade-in duration-500">
                <p className="font-bold text-blue-700">
                  ¡Ganador: {event.winner}!
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
  );
};
