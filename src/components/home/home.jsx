import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BattlesHistory, TeamsPreview, VersusTag } from "./home.content";
import { CustomButton, CustomSelect, showToast } from "../base";
import { usePokemonTeams, useSelectTeamsToFight } from "../../stores";
import { HomeSectionContainer } from "./home.styled";

export const HomeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const allTeams = usePokemonTeams();
  const setTeams = useSelectTeamsToFight();

  const [redTeamId, setRedTeamId] = useState();
  const [blueTeamId, setBlueTeamId] = useState();

  const handleFight = () => {
    if (redTeamId === blueTeamId) {
      showToast({
        type: "error",
        text: "Los equipos contendientes deben ser diferentes",
      });
      return;
    }

    const blueTeam = allTeams.find(({ id }) => blueTeamId === id);
    const redTeam = allTeams.find(({ id }) => redTeamId === id);

    if (blueTeam && redTeam) {
      setTeams({ blueTeam, redTeam });
      navigate("/battle-arena");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 h-full">
      <div className={HomeSectionContainer}>
        <TeamsPreview />
      </div>
      <div className={HomeSectionContainer}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-black text-neutral-700 uppercase tracking-wide">
            {t("Home.PrepareBattle.Title")}
          </span>
          <div className="h-1 w-16 bg-neutral-500 rounded-full"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="w-full">
            <CustomSelect
              value={redTeamId}
              title={t("Base.RedTeam")}
              options={allTeams.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
              handleChange={(value) => setRedTeamId(value)}
            />
          </div>
          <VersusTag />
          <div className="w-full">
            <CustomSelect
              value={blueTeamId}
              title={t("Base.BlueTeam")}
              options={allTeams.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
              handleChange={(value) => setBlueTeamId(value)}
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <CustomButton
            customStyles={{
              fontSize: 18,
              padding: "12px 60px",
            }}
            handleClick={handleFight}
            isDisabled={!redTeamId || !blueTeamId}
          >
            {t("Base.Battle")}
          </CustomButton>
        </div>
        <div className="w-full border-t border-neutral-200 my-2"></div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <BattlesHistory />
        </div>
      </div>
    </div>
  );
};
