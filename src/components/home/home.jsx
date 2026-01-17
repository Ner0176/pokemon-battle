import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BattlesHistory, TeamsPreview } from "./home.content";
import { CustomButton, CustomSelect, showToast } from "../base";
import { usePokemonTeams, useSelectTeamsToFight } from "../../stores";

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
    <div className="grid grid-cols-2 gap-10 py-4 h-full">
      <TeamsPreview />
      <div className="flex flex-col gap-3 h-full min-h-0">
        <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold">{t("Home.PrepareBattle.Title")}</h2>
          <div className="flex flex-row items-center gap-6 w-full">
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
            <span className="font-bold text-2xl text-gray-400 mt-4">VS</span>
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
          <CustomButton
            handleClick={handleFight}
            isDisabled={!redTeamId || !blueTeamId}
            customStyles={{ fontSize: 18, padding: "16px 40px" }}
          >
            {t("Base.Battle")}
          </CustomButton>
        </div>
        <BattlesHistory />
      </div>
    </div>
  );
};
