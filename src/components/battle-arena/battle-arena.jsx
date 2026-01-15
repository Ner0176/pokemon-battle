/* eslint-disable no-unused-vars */
import { useState } from "react";
import { usePokemonTeams } from "../stores";
import { simulateBattle } from "./battle-arena.utils";
import { useEffect } from "react";
import { Container } from "../base";
import { BattleTeamInfo, FightingPokemon } from "./battle-arena.content";

export const BattleArena = () => {
  const teams = usePokemonTeams();
  const team1 = teams[0];
  const team2 = teams[1];

  const [history, setHistory] = useState([]);
  const [team1PkmIdx, setTeam1PkmIdx] = useState(0);
  const [team2PkmIdx, setTeam2PkmIdx] = useState(0);

  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 h-full">
        <div className="col-span-2 h-full">
          <div
            className="relative h-1/2 border border-neutral-200 rounded-xl bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage:
                "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d85ijvr-c2c4a900-5386-4a6a-bee8-5b73e5235ebf.png/v1/fit/w_800,h_480,q_70,strp/pokemon_x_and_y_forest_battle_background_by_phoenixoflight92_d85ijvr-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDgwIiwicGF0aCI6Ii9mLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NC9kODVpanZyLWMyYzRhOTAwLTUzODYtNGE2YS1iZWU4LTViNzNlNTIzNWViZi5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xx5cTmUlA2EWUsmt3lDPvuHwUZGTABcySHov1NlJtas')",
            }}
          >
            <FightingPokemon pokemon={team1.team[0]} />
            <FightingPokemon variant="right" pokemon={team2.team[0]} />
            <BattleTeamInfo teamDetails={team1} />
            <BattleTeamInfo teamDetails={team2} variant="right" />
          </div>
        </div>
        <div className="flex flex-col bg-white w-full h-full rounded-2xl py-4 px-8">
          <span className="text-lg text-center">Historial</span>
        </div>
      </div>
    </Container>
  );
};
