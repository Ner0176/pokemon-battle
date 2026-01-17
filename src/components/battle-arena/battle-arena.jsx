import { useState } from "react";
import { useGetBattleTeams } from "../../stores";
import { simulateBattle } from "./battle-arena.utils";
import { useEffect } from "react";
import { CustomButton } from "../base";
import {
  BattleHistory,
  BattleTeamInfo,
  FightingPokemon,
} from "./battle-arena.content";
import { useNavigate } from "react-router-dom";
import { BattleResultSummary } from "./result-summary";
import { useTranslation } from "react-i18next";

export const BattleArena = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const teams = useGetBattleTeams();

  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);
  const [stageIdx, setStageIdx] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(true);

  const { pokemonA, pokemonB, loser } = history[stageIdx] ?? {};

  useEffect(() => {
    if (teams.blueTeam && teams.redTeam) {
      const result = simulateBattle(teams.redTeam, teams.blueTeam, t);
      setHistory(result.history);
      setResult(result);
      setStageIdx(0);
    } else navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStage = () => {
    setIsAnimating(false);

    const timer = setTimeout(() => {
      setIsAnimating(true);
      setStageIdx((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-10 h-full pb-4">
        <div className="col-span-2 flex flex-col gap-3 h-full">
          <div
            className="relative h-1/2 border border-neutral-200 rounded-xl bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage:
                "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d85ijvr-c2c4a900-5386-4a6a-bee8-5b73e5235ebf.png/v1/fit/w_800,h_480,q_70,strp/pokemon_x_and_y_forest_battle_background_by_phoenixoflight92_d85ijvr-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDgwIiwicGF0aCI6Ii9mLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NC9kODVpanZyLWMyYzRhOTAwLTUzODYtNGE2YS1iZWU4LTViNzNlNTIzNWViZi5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xx5cTmUlA2EWUsmt3lDPvuHwUZGTABcySHov1NlJtas')",
            }}
          >
            {pokemonA && (
              <FightingPokemon
                pokemon={pokemonA}
                stageIdx={stageIdx}
                key={pokemonA.name}
                isLoser={!isAnimating && loser === pokemonA.name}
              />
            )}
            {pokemonB && (
              <FightingPokemon
                variant="right"
                pokemon={pokemonB}
                stageIdx={stageIdx}
                key={pokemonB.name}
                isLoser={!isAnimating && loser === pokemonB.name}
              />
            )}
            {history && (
              <>
                <BattleTeamInfo
                  currentPokemon={pokemonA}
                  teamDetails={teams.redTeam}
                />
                <BattleTeamInfo
                  variant="right"
                  currentPokemon={pokemonB}
                  teamDetails={teams.blueTeam}
                />
              </>
            )}
          </div>
          <div>
            <CustomButton
              customStyles={{ fontSize: 16 }}
              handleClick={nextStage}
            >
              Ver resultado
            </CustomButton>
          </div>
        </div>
        <BattleHistory
          history={history}
          stageIdx={stageIdx}
          isAnimating={isAnimating}
        />
      </div>
      {result && stageIdx === history.length && (
        <BattleResultSummary
          teams={teams}
          result={result}
          handleClose={() => navigate("/")}
        />
      )}
    </>
  );
};
