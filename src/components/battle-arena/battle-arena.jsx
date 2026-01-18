import { useState, useEffect, useRef } from "react";
import {
  useAddBattleToHistory,
  useClearBattleTeams,
  useGetBattleTeams,
} from "../../stores";
import { simulateBattle } from "./battle-arena.utils";
import { CustomButton } from "../base";
import {
  BattleHistory,
  BattleTeamInfo,
  FightingPokemon,
} from "./battle-arena.content";
import { useNavigate } from "react-router-dom";
import { BattleResultSummary } from "./result-summary";
import { useTranslation } from "react-i18next";
import battleMusic from "../../assets/audio/cintia-battle-bg.mp3";
import pkmBattleBg from "../../assets/images/pokemon-battle-bg.jpg";

export const BattleArena = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const timeoutRef = useRef(null);

  const teams = useGetBattleTeams();
  const addBattle = useAddBattleToHistory();
  const clearBattleTeams = useClearBattleTeams();

  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);
  const [stageIdx, setStageIdx] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(true);

  const { pokemonRed, pokemonBlue, loser } = history[stageIdx] ?? {};

  useEffect(() => {
    const audio = new Audio(battleMusic);
    audio.volume = 0.3;
    audio.loop = true;

    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const { redTeam, blueTeam } = teams;
    if (!!blueTeam && !!redTeam) {
      8;
      const result = simulateBattle(redTeam, blueTeam, t);
      setHistory(result.history);
      setResult(result);
      setStageIdx(0);
    } else navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStage = () => {
    setIsAnimating(false);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
      setStageIdx((prev) => prev + 1);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (result && stageIdx === history.length) {
      addBattle({ ...result, date: new Date() });
    }
  }, [addBattle, history, result, stageIdx]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 xl:gap-6 h-full pb-4">
        <div className="col-span-2 flex flex-col gap-4 h-full 2xl:h-[85%]">
          <div
            style={{ backgroundImage: `url(${pkmBattleBg})` }}
            className="relative h-full border-4 border-white shadow-2xl rounded-2xl bg-cover bg-center overflow-hidden"
          >
            {pokemonRed && (
              <FightingPokemon
                stageIdx={stageIdx}
                pokemon={pokemonRed}
                key={pokemonRed.name}
                isLoser={!isAnimating && loser === pokemonRed.name}
              />
            )}
            {pokemonBlue && (
              <FightingPokemon
                variant="right"
                pokemon={pokemonBlue}
                stageIdx={stageIdx}
                key={pokemonBlue.name}
                isLoser={!isAnimating && loser === pokemonBlue.name}
              />
            )}
            {history && teams.redTeam && teams.blueTeam && (
              <>
                <BattleTeamInfo
                  currentPokemon={pokemonRed}
                  teamDetails={teams.redTeam}
                />
                <BattleTeamInfo
                  variant="right"
                  currentPokemon={pokemonBlue}
                  teamDetails={teams.blueTeam}
                />
              </>
            )}
          </div>
          <div className="flex justify-center mt-2">
            {stageIdx < history.length && (
              <CustomButton
                customStyles={{
                  fontSize: 16,
                  padding: "12px 40px",
                  borderRadius: "99px",
                }}
                handleClick={nextStage}
                isDisabled={!isAnimating}
              >
                {t("BattleArena.ViewResult")}
              </CustomButton>
            )}
          </div>
        </div>
        <div className="h-full min-h-0 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col">
          <BattleHistory
            history={history}
            stageIdx={stageIdx}
            isAnimating={isAnimating}
          />
        </div>
      </div>
      {result && stageIdx === history.length && (
        <BattleResultSummary
          result={result}
          handleClose={() => {
            navigate("/");
            clearBattleTeams();
          }}
        />
      )}
    </>
  );
};
