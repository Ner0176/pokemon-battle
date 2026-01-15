import { useTranslation } from "react-i18next";

export const TeamSummary = ({
  teamName,
  survivors,
  defeated,
  isWinner,
  color,
  align = "left",
}) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";

  return (
    <div
      className={`flex flex-col ${
        align === "right" ? "items-end text-right" : "items-start"
      }`}
    >
      <span className={`font-bold text-lg ${color}`}>{teamName}</span>
      <div className="flex items-center gap-4 mt-1 text-sm">
        <div className="flex flex-col">
          <span className="text-neutral-500 text-xs">
            {t(`${basePath}.Alive`)}
          </span>
          <span className="font-bold text-lg">{survivors}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-neutral-500 text-xs">
            {t(`${basePath}.Defeated`)}
          </span>
          <span className="font-bold text-lg text-neutral-400">{defeated}</span>
        </div>
      </div>
      {isWinner && (
        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full mt-1">
          {t(`${basePath}.Victory`)}
        </span>
      )}
    </div>
  );
};
