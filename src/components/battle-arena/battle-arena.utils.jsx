export const simulateBattle = (teamA, teamB, t) => {
  let fightersA = [...teamA.team];
  let fightersB = [...teamB.team];
  const history = [];

  let currentPokemonAIndex = 0;
  let currentPokemonBIndex = 0;

  while (
    currentPokemonAIndex < fightersA.length &&
    currentPokemonBIndex < fightersB.length
  ) {
    const p1 = fightersA[currentPokemonAIndex];
    const p2 = fightersB[currentPokemonBIndex];

    const stats1 = p1.stats;
    const stats2 = p2.stats;

    let winnerPokemon;
    let loserPokemon;
    let reason = "";

    const firstAttacker =
      stats1["SPE"] >= stats2["SPE"]
        ? { p: p1, s: stats1 }
        : { p: p2, s: stats2 };
    const secondAttacker =
      stats1["SPE"] >= stats2["SPE"]
        ? { p: p2, s: stats2 }
        : { p: p1, s: stats1 };

    if (firstAttacker.s.atk > secondAttacker.s.def) {
      winnerPokemon = firstAttacker.p;
      loserPokemon = secondAttacker.p;
      reason = t("BattleArena.RedWins", {
        pkm1: winnerPokemon.name,
        pkm2: loserPokemon.name,
      });
    } else if (secondAttacker.s.atk > firstAttacker.s.def) {
      winnerPokemon = secondAttacker.p;
      loserPokemon = firstAttacker.p;
      reason = t("BattleArena.BlueWins", {
        pkm1: loserPokemon.name,
        pkm2: loserPokemon.name,
      });
    } else {
      winnerPokemon = firstAttacker.p;
      loserPokemon = secondAttacker.p;
      reason = t("BattleArena.Tie");
    }

    history.push({
      reason,
      pokemonA: p1,
      pokemonB: p2,
      loser: loserPokemon.name,
      winner: winnerPokemon.name,
      roundWinnerTeam: winnerPokemon.id === p1.id ? teamA.name : teamB.name,
    });

    if (winnerPokemon.id === p1.id) {
      currentPokemonBIndex++;
    } else {
      currentPokemonAIndex++;
    }
  }

  return {
    teamA,
    teamB,
    history,
    winnerTeam:
      currentPokemonAIndex < fightersA.length ? teamA.name : teamB.name,
    survivorsA: fightersA.length - currentPokemonAIndex,
    defeatedA: currentPokemonAIndex,
    survivorsB: fightersB.length - currentPokemonBIndex,
    defeatedB: currentPokemonBIndex,
  };
};
