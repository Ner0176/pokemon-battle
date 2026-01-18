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
    left: "bottom-[25%] left-[12%] z-10",
    right: "top-[18%] right-[8%] z-10",
  };

  const animationClass = isLoser
    ? "opacity-0 translate-y-20 scale-90 delay-1000 duration-800"
    : isEntering
      ? "opacity-0 -translate-y-20 scale-90"
      : "opacity-100 translate-y-0 scale-100";

  return (
    <div
      className={`absolute flex flex-row items-center gap-5 xl:gap-10 transition-all duration-1000
        ${variants[variant] || variants.left} ${animationClass} 
        ${variant === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/50 h-fit min-w-35">
        <span className="font-bold uppercase text-[10px] xl:text-xs">
          {name}
        </span>
        <div className="w-32 h-1.5 xl:h-2 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
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
      <div className="relative flex items-end justify-center size-26 xl:size-32">
        <img
          alt={name}
          style={{ imageRendering: "pixelated" }}
          src={variant === "left" ? movingBackSprite : movingSprite}
          className={`
                w-auto h-auto origin-bottom drop-shadow-2xl
                ${variant === "left" ? "scale-[1.4] xl:scale-[1.9]" : "scale-[1.2] xl:scale-[1.6]"}
            `}
        />
      </div>
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
    left: "bottom-0 right-0 rounded-tl-2xl text-red-600",
    right: "top-0 left-0 rounded-br-2xl text-blue-600",
  };

  const currentPkmIdx = team.findIndex((pkm) => pkm.id === currentPokemon?.id);

  return (
    <div
      className={`absolute z-20 bg-white/90 backdrop-blur-md flex flex-col gap-1.5 items-center px-5 py-2.5 shadow-sm ${
        variants[variant] || variants.left
      }`}
    >
      <span className="text-xs xl:text-sm font-bold uppercase tracking-wider drop-shadow-[1px_1px_0_rgba(0,0,0,0.25)]">
        {name}
      </span>
      <div className="flex gap-1">
        {team.map(({ staticSprite }, idx) => {
          return (
            <img
              key={idx}
              src={staticSprite}
              className={`h-8 xl:h-10 object-contain transition-opacity duration-300 ${
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
      <div className="border-b border-neutral-100 bg-neutral-50/50 p-2.5 xl:p-4">
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
                  <span className="bg-neutral-100 text-neutral-500 text-[8px] xl:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {t("Base.Round", { value: i + 1 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs xl:text-sm mb-2 px-1 font-semibold">
                  <span
                    className={`${isWinnerA && showResult ? "text-red-600" : "text-neutral-600"}`}
                  >
                    {pokemonRed.name}
                  </span>
                  <span className="text-xs text-neutral-300 font-bold italic">
                    VS
                  </span>
                  <span
                    className={`${!isWinnerA && showResult ? "text-blue-600" : "text-neutral-600"}`}
                  >
                    {pokemonBlue.name}
                  </span>
                </div>
                {showResult ? (
                  <div className="mt-2 p-2 bg-blue-50/50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon
                        path={mdiTrophy}
                        className="size-3 xl:size-3.5 text-yellow-500 "
                      />
                      <p className="font-bold text-[10px] xl:text-xs text-neutral-800">
                        {`${t("Base.Winner")}: `}
                        <span className="text-blue-600">{winner}</span>
                      </p>
                    </div>
                    <span className="text-[10px] xl:text-xs text-neutral-500 italic block leading-normal">
                      "{reason}"
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-[10px] xl:text-xs text-neutral-400 italic p-2 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg">
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
