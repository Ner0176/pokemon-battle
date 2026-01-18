import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DisplayStats } from "../team-builder";
import Icon from "@mdi/react";
import { mdiTrophy } from "@mdi/js";

export const FightingPokemon = ({ pokemon, isLoser, variant = "left" }) => {
  const { name, stats, movingSprite, movingBackSprite } = pokemon;

  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    left: "bottom-[25%] left-[15%] z-10",
    right: "top-[18%] right-[15%] z-10",
  };

  const animationClass = isLoser
    ? "opacity-0 translate-y-20 scale-90 delay-1000 duration-800"
    : isEntering
      ? "opacity-0 -translate-y-20 scale-90"
      : "opacity-100 translate-y-0 scale-100";

  return (
    <div
      className={`absolute flex flex-row items-end gap-4 transition-all duration-1000
        ${variants[variant] || variants.left} ${animationClass} 
        ${variant === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/50 h-fit min-w-35">
        <span className="font-bold uppercase text-xs">{name}</span>
        <div className="w-32 h-2.5 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-1000 ${
              isLoser ? "w-0 bg-red-500" : "w-full bg-emerald-500"
            }`}
          />
        </div>
        <div className="flex flex-row items-center gap-1.5 opacity-80">
          <DisplayStats stats={stats} fontSize={9} />
        </div>
      </div>
      <img
        alt={name}
        src={variant === "left" ? movingBackSprite : movingSprite}
        className={`h-24 lg:h-32 aspect-square object-contain drop-shadow-xl`}
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
    left: "bottom-0 left-0 rounded-tr-2xl text-red-600",
    right: "top-0 right-0 rounded-bl-2xl text-blue-600",
  };

  const currentPkmIdx = team.findIndex((pkm) => pkm.id === currentPokemon?.id);

  return (
    <div
      className={`absolute z-20 bg-white/90 backdrop-blur-md flex flex-col gap-2 items-center px-6 py-3 shadow-sm ${
        variants[variant] || variants.left
      }`}
    >
      <span className="text-sm font-bold uppercase tracking-wider">{name}</span>
      <div className="flex gap-1">
        {team.map(({ staticSprite }, idx) => {
          return (
            <img
              key={idx}
              src={staticSprite}
              className={`h-10 object-contain transition-opacity duration-300 ${
                currentPkmIdx > idx
                  ? "opacity-30 grayscale"
                  : "opacity-100 drop-shadow-sm"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const BattleHistory = ({ history, stageIdx, isAnimating }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col size-full">
      <div className="border-b border-neutral-100 bg-neutral-50/50 p-4">
        <span className="text-lg font-bold text-neutral-700 block text-center">
          {t("BattleArena.History.Title")}
        </span>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-3">
        {history
          .slice(0, stageIdx + 1)
          .map(({ winner, pokemonRed, pokemonBlue, reason }, i) => {
            const showResult = i < stageIdx || !isAnimating;
            const isWinnerA = winner === pokemonRed.name;

            return (
              <div
                key={i}
                className="bg-white border border-neutral-100 rounded-xl shadow-sm p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {t("Base.Round", { value: i + 1 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2 px-1">
                  <span
                    className={`font-semibold ${isWinnerA && showResult ? "text-green-600" : "text-neutral-600"}`}
                  >
                    {pokemonRed.name}
                  </span>
                  <span className="text-xs text-neutral-300 font-bold italic">
                    VS
                  </span>
                  <span
                    className={`font-semibold ${!isWinnerA && showResult ? "text-green-600" : "text-neutral-600"}`}
                  >
                    {pokemonBlue.name}
                  </span>
                </div>
                {showResult ? (
                  <div className="mt-2 p-2 bg-blue-50/50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon
                        path={mdiTrophy}
                        className="size-3.5 text-yellow-500 "
                      />
                      <p className="font-bold text-xs text-neutral-800">
                        {`${t("Base.Winner")}: `}
                        <span className="text-blue-600">{winner}</span>
                      </p>
                    </div>
                    <span className="text-xs text-neutral-500 italic leading-snug">
                      "{reason}"
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-xs text-neutral-400 italic p-2 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg">
                    {t("BattleArena.Fighting")}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
