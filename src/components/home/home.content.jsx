import Icon from "@mdi/react";
import { mdiPlus, mdiTrophyOutline } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetBattleHistory, usePokemonTeams } from "../../stores";
import { EmptyData } from "../base";
import { DisplayStats } from "../team-builder";
import { format } from "date-fns";
import { useState } from "react";
import { BattleResultSummary } from "../battle-arena/result-summary";
import Skeleton from "react-loading-skeleton";
import Pokeball from "../../assets/images/pokeball.png";
import LazySornlax from "../../assets/images/snorlax.png";
import {
  BattleHistoryContainer,
  EmptyTeamsContainer,
  HistorySeeTag,
  TeamCoontainer,
  VersusTagStyle,
} from "./home.styled";

const TeamItem = ({ teamName, team, handleClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div onClick={handleClick} className={TeamCoontainer}>
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
        <button
          onClick={() => navigate("/team-builder")}
          className="text-neutral-600 hover:bg-neutral-100 p-1 cursor-pointer rounded transition-colors"
        >
          <Icon path={mdiPlus} className="size-6" />
        </button>
      </div>
      <div
        className={`flex flex-col gap-3 size-full overflow-y-auto ${!pokemonTeams.length ? "items-center justify-center" : ""}`}
      >
        {!pokemonTeams.length ? (
          <div className={EmptyTeamsContainer}>
            <EmptyData
              imageSize={120}
              image={Pokeball}
              title={<div className="pt-2">{t("Home.Teams.Empty")}</div>}
            />
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
  const basePath = "Home.History";

  const history = useGetBattleHistory();

  const [selectedBattle, setSelectedBattle] = useState();

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Icon path={mdiTrophyOutline} className="size-6 text-yellow-500" />
        <span className="text-lg font-bold text-neutral-700">
          {t(`BattleArena.History.Title`)}
        </span>
      </div>
      {history.length === 0 ? (
        <EmptyData
          imageSize={160}
          image={LazySornlax}
          title={t(`${basePath}.Empty`)}
        />
      ) : (
        <div className="flex flex-col gap-2 size-full overflow-y-auto pr-1">
          {history.map((battle, index) => {
            const { redTeam, blueTeam, date, winnerTeam } = battle;
            return (
              <div
                key={index}
                className={BattleHistoryContainer}
                onClick={() => setSelectedBattle(battle)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-1 h-8 rounded-full ${winnerTeam === redTeam.name ? "bg-red-500" : "bg-blue-500"}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-neutral-700">
                      {redTeam.name} vs {blueTeam.name}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {date && format(date, "dd/MM/yyyy HH:mm")}
                    </span>
                  </div>
                </div>
                <span className={HistorySeeTag}>{t(`${basePath}.See`)}</span>
              </div>
            );
          })}
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
