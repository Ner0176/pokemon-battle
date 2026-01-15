import { useTranslation } from "react-i18next";
import { CustomButton, Modal } from "../../base";
import { TeamSummary } from "./result-summary.content";

export const BattleResultSummary = ({ result, teams, handleClose }) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";

  if (!result) return null;

  const { redTeam, blueTeam } = teams;

  return (
    <Modal
      width="800px"
      handleClose={handleClose}
      title={t("BattleArena.Results.Title")}
    >
      <div className="flex flex-col gap-6 pb-6">
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <h3 className="text-lg font-bold text-center mb-4 text-neutral-700">
            {t("Base.Winner")}:{" "}
            <span className="text-green-600 uppercase">
              {result.winnerTeam}
            </span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <TeamSummary
              teamName={redTeam.name}
              survivors={result.survivorsA}
              defeated={result.defeatedA}
              isWinner={result.winnerTeam === redTeam.name}
              color="text-red-600"
            />
            <TeamSummary
              teamName={blueTeam.name}
              survivors={result.survivorsB}
              defeated={result.defeatedB}
              isWinner={result.winnerTeam === blueTeam.name}
              color="text-blue-600"
              align="right"
            />
          </div>
        </div>

        {/* --- SECCIÓN DE HISTORIAL DE RONDAS --- */}
        <div>
          <h4 className="font-bold text-neutral-600 mb-2">
            {t(`${basePath}.Breakdown`)}
          </h4>
          <div className="flex flex-col gap-2">
            {result.history.map((round, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-neutral-100 rounded-lg shadow-sm text-sm"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <span className="font-bold bg-neutral-200 px-2 py-1 rounded text-xs text-neutral-600">
                    R{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{round.pokemonA.name}</span>
                    <span className="text-neutral-400 text-xs">vs</span>
                    <span className="font-semibold">{round.pokemonB.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    title={round.reason}
                    className="text-neutral-500 text-xs hidden sm:block truncate max-w-50"
                  >
                    {round.reason}
                  </span>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                    {t(`${basePath}.Wins`, { name: round.winner })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <CustomButton handleClick={handleClose}>
            {t(`${basePath}.Close`)}
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};
