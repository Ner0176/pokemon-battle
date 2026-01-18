import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { mdiHeart, mdiSkull, mdiTrophy } from "@mdi/js";
import { RoundContainer, RoundWinTag } from "./result-summary.styled";

const StatsBox = ({ variant, value }) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";

  const styles = {
    alive: {
      icon: mdiHeart,
      keyText: "Alive",
      textColor: "#404040",
      iconColor: "oklch(72.3% 0.219 149.579)",
    },
    defeated: {
      icon: mdiSkull,
      keyText: "Defeated",
      textColor: "#a1a1a1",
      iconColor: "#a1a1a1",
    },
  };

  return (
    <div className="flex flex-col items-center p-2 bg-white/60 rounded-lg backdrop-blur-sm min-w-25">
      <Icon
        className="size-4.5 xl:size-6 mb-1"
        path={styles[variant].icon}
        color={styles[variant].iconColor}
      />
      <span
        className="text-lg xl:text-2xl font-bold"
        style={{ color: styles[variant].textColor }}
      >
        {value}
      </span>
      <span className="text-[10px] uppercase font-bold text-neutral-400">
        {t(`${basePath}.${styles[variant].keyText}`)}
      </span>
    </div>
  );
};

export const TeamSummary = ({
  color,
  teamName,
  defeated,
  isWinner,
  survivors,
  align = "left",
}) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";

  const isRight = align === "right";
  const containerClasses = isRight
    ? "items-end text-right"
    : "items-start text-left";

  const bgTheme = color.includes("red")
    ? "bg-red-50 border-red-100"
    : "bg-blue-50 border-blue-100";

  return (
    <div
      className={`flex flex-col ${containerClasses} p-3 xl:p-4 rounded-xl border ${bgTheme} transition-all duration-300 ${isWinner ? "ring-2 ring-yellow-400 shadow-lg scale-105 z-10" : "opacity-80"}`}
    >
      <div className="flex flex-col mb-3">
        {isWinner && (
          <div
            className={`flex items-center gap-1 text-yellow-600 mb-1 ${isRight ? "justify-end" : "justify-start"}`}
          >
            <Icon path={mdiTrophy} size={0.8} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t(`${basePath}.Victory`)}
            </span>
          </div>
        )}
        <span
          className={`font-black text-lg xl:text-xl leading-tight ${color}`}
        >
          {teamName}
        </span>
      </div>
      <div
        className={`flex items-center gap-4 ${isRight ? "flex-row-reverse" : "flex-row"}`}
      >
        <StatsBox value={survivors} variant="alive" />
        <StatsBox value={defeated} variant="defeated" />
      </div>
    </div>
  );
};

const BattleName = ({ name, isWinner }) => (
  <span
    className={`font-semibold transition-colors text-sm sxl:text-base ${
      isWinner ? "text-green-600" : "text-neutral-400 line-through decoration-2"
    }`}
  >
    {name}
  </span>
);

export const RoundsSection = ({ index, round }) => {
  const { t } = useTranslation();

  const { winner, pokemonRed, pokemonBlue, reason } = round;

  const isAWinner = winner === pokemonRed.name;

  return (
    <div key={index} className={RoundContainer}>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="font-mono font-bold text-[10px] xl:text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
          #{index + 1}
        </span>
        <div className="flex items-center gap-2 text-sm">
          <BattleName name={pokemonRed.name} isWinner={isAWinner} />
          <span className="text-[10px] xl:text-xs text-neutral-300 font-bold">
            VS
          </span>
          <BattleName name={pokemonBlue.name} isWinner={!isAWinner} />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <span
          title={reason}
          className="text-neutral-400 text-[10px] xl:text-xs italic truncate max-w-37.5"
        >
          "{reason}"
        </span>
        <span className={RoundWinTag}>
          {t(`BattleArena.Results.Wins`, { name: winner })}
        </span>
      </div>
    </div>
  );
};
