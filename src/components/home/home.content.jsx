import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePokemonTeams } from "../stores";
import { CustomButton } from "../base";

export const TeamsPreview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pokemonTeams = usePokemonTeams();

  const showTeamDetails = (teamId) => {
    navigate(`/team-builder?id=${teamId}`);
  };

  return (
    <div className="flex flex-col items-center gap-5 h-full border-r px-6 border-neutral-500">
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
              onClick={() => showTeamDetails(id)}
              className="flex flex-col items-center gap-2 w-full bg-white border-2 border-neutral-300 shadow-lg rounded-lg py-2 px-4 cursor-pointer hover:shadow-xl hover:bg-neutral-100 max-w-[75%]"
            >
              <span>{name}</span>
              <div className="flex flex-row items-center justify-evenly gap-3 w-full">
                {team.map((pkm) => (
                  <img className="size-10" src={pkm.staticSprite} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
