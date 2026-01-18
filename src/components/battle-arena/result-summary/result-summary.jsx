import Icon from "@mdi/react";
import { VersusTag } from "../../home";
import { mdiSwordCross } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { CustomButton, Modal } from "../../base";
import { RoundsSection, TeamSummary } from "./result-summary.content";

export const BattleResultSummary = ({ result, handleClose }) => {
  const { t } = useTranslation();
  const basePath = "BattleArena.Results";

  if (!result) return null;

  const { redTeam, blueTeam, winnerTeam } = result;

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
      footer={ResultFooter}
      handleClose={handleClose}
      title={t("BattleArena.Results.Title")}
    >
      <div className="flex flex-col gap-6 py-4">
        <div className="flex flex-col items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
            {t("Base.Winner")}
          </span>
          <span className="text-2xl xl:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500 drop-shadow-sm mb-6 text-center">
            {winnerTeam}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 w-full">
            <TeamSummary
              color="text-red-600"
              teamName={redTeam.name}
              defeated={result.defeatedRed}
              survivors={result.survivorsRed}
              isWinner={winnerTeam === redTeam.name}
            />
            <VersusTag />
            <TeamSummary
              align="right"
              color="text-blue-600"
              teamName={blueTeam.name}
              defeated={result.defeatedBlue}
              survivors={result.survivorsBlue}
              isWinner={winnerTeam === blueTeam.name}
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
