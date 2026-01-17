import Icon from "@mdi/react";
import { mdiPlus, mdiTrophyOutline } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetBattleHistory, usePokemonTeams } from "../../stores";
import { CustomButton, EmptyData } from "../base";
import { DisplayStats } from "../team-builder";
import { format } from "date-fns";
import { useState } from "react";
import { BattleResultSummary } from "../battle-arena/result-summary";
import Skeleton from "react-loading-skeleton";
import Pokeball from "../../assets/images/pokeball.png";
import LazySornlax from "../../assets/images/snorlax.png";
import { VersusTagStyle } from "./home.styled";

const TeamItem = ({ teamName, team, handleClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col items-center gap-3 w-full bg-white border border-neutral-200 shadow-sm rounded-xl py-3 px-4 cursor-pointer hover:shadow-md hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
    >
      <span className="font-bold text-lg text-neutral-700 w-full text-center truncate group-hover:text-emerald-600">
        {teamName}
      </span>
      <div className="w-16 h-0.5 bg-neutral-100 group-hover:bg-emerald-200" />
      <div className="flex flex-row items-center justify-around gap-4 w-full">
        {team.map(({ id, stats, staticSprite }) => (
          <div key={id} className="flex flex-col items-center gap-1">
            {!isLoaded && (
              <Skeleton
                style={{ width: 56, height: 56, borderRadius: "50%" }}
              />
            )}
            <img
              loading="lazy"
              src={staticSprite}
              alt="Pokemon sprite"
              onLoad={() => setIsLoaded(true)}
              className="h-14 w-14 object-contain drop-shadow-sm transition-transform group-hover:scale-110"
            />
            <DisplayStats stats={stats} fontSize={10} />
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
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row items-center justify-between mb-4 border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-neutral-700">
            {t("Home.Teams.Title")}
          </span>
          <span className="bg-neutral-100 text-neutral-500 text-xs font-bold px-2 py-1 rounded-full">
            {pokemonTeams.length}
          </span>
        </div>
        {pokemonTeams.length > 0 && (
          <button
            onClick={() => navigate("/team-builder")}
            className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 p-1 cursor-pointer rounded transition-colors"
          >
            <Icon path={mdiPlus} className="size-6" />
          </button>
        )}
      </div>
      <div
        className={`flex flex-col gap-3 size-full overflow-y-auto ${!pokemonTeams.length ? "items-center justify-center" : ""}`}
      >
        {!pokemonTeams.length ? (
          <div className="flex flex-col items-center text-center p-8 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 w-full h-full justify-center">
            <EmptyData
              imageSize={120}
              image={Pokeball}
              customStyles={{ gap: 16 }}
            />
            <h3 className="text-lg font-medium text-neutral-500 mt-4 mb-6">
              No tienes equipos listos para el combate.
            </h3>
            <CustomButton
              handleClick={() => navigate("/team-builder")}
              customStyles={{ width: "fit-content", padding: "10px 24px" }}
            >
              <div className="flex items-center gap-2">
                <Icon path={mdiPlus} className="size-5" />
                <span>{t("Base.CreateTeam")}</span>
              </div>
            </CustomButton>
          </div>
        ) : (
          pokemonTeams.map(({ id, name, team }) => (
            <TeamItem
              key={id}
              team={team}
              teamName={name}
              handleClick={() => showTeamDetails(id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const VersusTag = () => {
  return <div className={VersusTagStyle}>VS</div>;
};

export const BattlesHistory = () => {
  const { t } = useTranslation();
  const basePath = "BattleArena.History";
  const [selectedBattle, setSelectedBattle] = useState();
  const history = useGetBattleHistory();

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Icon path={mdiTrophyOutline} className="size-6 text-yellow-500" />
        <h3 className="text-lg font-bold text-neutral-700">
          {t(`${basePath}.Title`)}
        </h3>
      </div>

      {history.length === 0 ? (
        // Usamos flex-grow para que el EmptyData ocupe todo el espacio vertical disponible
        <div className="grow flex flex-col items-center justify-center bg-neutral-50 rounded-xl border border-neutral-100">
          <EmptyData
            imageSize={140}
            image={LazySornlax}
            title={
              <span className="text-neutral-400 font-medium mt-4">
                Aún no se han registrado batallas
              </span>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 size-full overflow-y-auto pr-1">
          {history.map((battle, index) => (
            <div
              key={index}
              onClick={() => setSelectedBattle(battle)}
              className="cursor-pointer group flex items-center justify-between p-3 bg-white hover:bg-emerald-50 border border-neutral-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-1 h-8 rounded-full ${battle.winner === "A" ? "bg-blue-500" : "bg-red-500"}`}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-neutral-700">
                    Team A vs Team B
                  </span>
                  <span className="text-xs text-neutral-400">
                    {battle.date
                      ? format(battle.date, "dd/MM/yyyy")
                      : "Reciente"}
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-neutral-300 bg-neutral-50 hover:text-emerald-300 hover:bg-emerald-50 px-2 py-1 rounded">
                Ver
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
    </>
  );
};
