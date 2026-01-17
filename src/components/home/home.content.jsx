import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetBattleHistory, usePokemonTeams } from "../../stores";
import { CustomButton } from "../base";
import { DisplayStats } from "../team-builder";
import { format } from "date-fns";
import { useState } from "react";
import { BattleResultSummary } from "../battle-arena/result-summary";
import Skeleton from "react-loading-skeleton";

const TeamItem = ({ teamName, team, handleClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center gap-2 w-full bg-white border-2 border-neutral-300 shadow-lg rounded-lg py-2 px-4 cursor-pointer hover:shadow-xl hover:bg-neutral-100 max-w-[75%] first:mt-4 last:mb-3"
    >
      <span className="w-3/4 text-center truncate">{teamName}</span>
      <div className="flex flex-row items-center justify-evenly gap-3 w-full">
        {team.map(({ id, stats, staticSprite }) => (
          <div key={id} className="flex flex-col items-center gap-1">
            {!isLoaded && (
              <Skeleton style={{ width: 48, height: 48, borderRadius: 10 }} />
            )}
            <img
              loading="lazy"
              src={staticSprite}
              onLoad={() => setIsLoaded(true)}
              className="h-16 aspect-square object-contain"
            />
            <DisplayStats stats={stats} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TeamsPreview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pokemonTeams = usePokemonTeams();

  const showTeamDetails = (teamId) => {
    navigate(`/team-builder?id=${teamId}`);
  };

  return (
    <div className="flex flex-col items-center h-full min-h-0 border-r border-neutral-500">
      <div className="flex flex-row items-center justify-between w-[75%] gap-3">
        <span className="text-3xl font-bold text-neutral-600">
          {t("Home.Teams.Title")}
        </span>
        <CustomButton handleClick={() => navigate("/team-builder")}>
          <Icon path={mdiPlus} className="size-3.5" />
          {t("Base.CreateTeam")}
        </CustomButton>
      </div>
      <div className="flex flex-col items-center gap-3 size-full overflow-y-auto">
        {pokemonTeams.map(({ id, name, team }) => {
          return (
            <TeamItem
              key={id}
              team={team}
              teamName={name}
              handleClick={() => showTeamDetails(id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const BattlesHistory = () => {
  const { t } = useTranslation();

  const [selectedBattle, setSelectedBattle] = useState();

  const history = useGetBattleHistory();

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 rounded-xl min-h-0 size-full">
      <h3 className="text-2xl font-bold mb-4">{t("Historial de Combatess")}</h3>
      {history.length === 0 ? (
        <p className="text-gray-500 italic">
          {t("No hay batallas registradas")}
        </p>
      ) : (
        <div className="flex flex-col gap-3 size-full overflow-y-auto">
          {history.map((battle, index) => (
            <div
              key={index}
              onClick={() => setSelectedBattle(battle)}
              className="cursor-pointer flex justify-between p-4 bg-white shadow-sm rounded-lg border border-neutral-200"
            >
              <span className="font-medium text-blue-600">{"Team A"}</span>
              <span className="font-bold text-gray-400">VS</span>
              <span className="font-medium text-red-600">{"Team B"}</span>
              <span className="text-sm text-gray-400">
                {battle.date ? format(battle.date, "dd/MM/yyyy") : "Reciente"}
              </span>
            </div>
          ))}
        </div>
      )}
      {selectedBattle && (
        <BattleResultSummary
          result={selectedBattle}
          teams={{
            redTeam: selectedBattle.teamA,
            blueTeam: selectedBattle.teamB,
          }}
          handleClose={() => setSelectedBattle(undefined)}
        />
      )}
    </div>
  );
};
