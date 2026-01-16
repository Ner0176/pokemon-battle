import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetBattleHistoric, usePokemonTeams } from "../../stores";
import { CustomButton } from "../base";
import { DisplayStats } from "../team-builder";

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
            <div
              key={id}
              onClick={() => showTeamDetails(id)}
              className="flex flex-col items-center gap-2 w-full bg-white border-2 border-neutral-300 shadow-lg rounded-lg py-2 px-4 cursor-pointer hover:shadow-xl hover:bg-neutral-100 max-w-[75%] first:mt-4 last:mb-3"
            >
              <span>{name}</span>
              <div className="flex flex-row items-center justify-evenly gap-3 w-full">
                {team.map(({ id, stats, staticSprite }) => (
                  <div key={id} className="flex flex-col items-center gap-1">
                    <img
                      src={staticSprite}
                      className="h-16 aspect-square object-contain"
                    />
                    <DisplayStats stats={stats} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BattlesHistoric = () => {
  const { t } = useTranslation();

  const historic = useGetBattleHistoric();

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-2xl font-bold mb-4">{t("Historial de Combates")}</h3>
      {historic.length === 0 ? (
        <p className="text-gray-500 italic">
          {t("No hay batallas registradas")}
        </p>
      ) : (
        <div className="grid gap-3">
          {historic.map((battle, index) => (
            <div
              key={index}
              className="flex justify-between p-4 bg-white shadow-sm rounded-lg border"
            >
              <span className="font-medium text-blue-600">
                {battle.blueTeam}
              </span>
              <span className="font-bold text-gray-400">VS</span>
              <span className="font-medium text-red-600">{battle.redTeam}</span>
              <span className="text-sm text-gray-400">
                {battle.date || "Reciente"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
