import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { mdiSwordCross } from "@mdi/js";
import { CustomButton, Modal } from "../../base";
import { RoundsSection, TeamSummary } from "./result-summary.content";
import { useAddBattleToHistory } from "../../../stores";
import { VersusTag } from "../../home";

export const BattleResultSummary = ({ result, teams, handleClose }) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";
  const addBattle = useAddBattleToHistory();
  const { redTeam, blueTeam } = teams;

  useEffect(() => {
    if (result) addBattle({ ...result, date: new Date() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  if (!result) return null;

  const winnerName = result.winnerTeam;

  const ResultFooter = (
    <CustomButton
      handleClick={handleClose}
      customStyles={{ padding: "10px 30px" }}
    >
      {t(`${basePath}.Close`)}
    </CustomButton>
  );

  return (
    <Modal
      width="850px"
      footer={ResultFooter}
      handleClose={handleClose}
      title={t("BattleArena.Results.Title")}
    >
      <div className="flex flex-col gap-6 pb-2">
        <div className="flex flex-col items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
            {t("Base.Winner")}
          </span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500 drop-shadow-sm mb-6 text-center">
            {winnerName}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 w-full">
            <TeamSummary
              color="text-red-600"
              teamName={redTeam.name}
              defeated={result.defeatedA}
              survivors={result.survivorsA}
              isWinner={winnerName === redTeam.name}
            />
            <VersusTag />
            <TeamSummary
              align="right"
              color="text-blue-600"
              teamName={blueTeam.name}
              survivors={result.survivorsB}
              defeated={result.defeatedB}
              isWinner={winnerName === blueTeam.name}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-2">
            <Icon path={mdiSwordCross} className="size-5 text-neutral-400" />
            <span className="font-bold text-neutral-600 text-sm uppercase tracking-wide">
              {t(`${basePath}.Breakdown`)}
            </span>
            <div className="grow h-px bg-neutral-100 ml-2"></div>
          </div>
          {result.history.map((round, idx) => (
            <RoundsSection key={idx} index={idx} round={round} />
          ))}
        </div>
      </div>
    </Modal>
  );
};
