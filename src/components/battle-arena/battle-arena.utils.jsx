export const simulateBattle = (redTeam, blueTeam, t) => {
  const history = [];
  let fightersRed = [...redTeam.team];
  let fightersBlue = [...blueTeam.team];

  let idxRed = 0;
  let idxBlue = 0;

  while (idxRed < fightersRed.length && idxBlue < fightersBlue.length) {
    const pRed = fightersRed[idxRed];
    const pBlue = fightersBlue[idxBlue];

    const redIsFaster = pRed.stats["SPE"] >= pBlue.stats["SPE"];
    const [first, second] = redIsFaster ? [pRed, pBlue] : [pBlue, pRed];

    let winner, loser, reasonKey;

    if (first["ATK"] > second["DEF"]) {
      winner = first;
      loser = second;
      reasonKey = "BattleArena.WinByAttack";
    } else if (second["ATK"] > first["DEF"]) {
      winner = second;
      loser = first;
      reasonKey = "BattleArena.WinByCounter";
    } else {
      winner = first;
      loser = second;
      reasonKey = "BattleArena.WinBySpeed";
    }

    history.push({
      pokemonRed: pRed,
      loser: loser.name,
      pokemonBlue: pBlue,
      winner: winner.name,
      roundWinnerTeam: winner.id === pRed.id ? redTeam.name : blueTeam.name,
      reason: t(reasonKey, { winner: winner.name, loser: loser.name }),
    });

    if (winner.id === pRed.id) idxBlue++;
    else idxRed++;
  }

  return {
    history,
    redTeam,
    blueTeam,
    defeatedRed: idxRed,
    defeatedBlue: idxBlue,
    survivorsRed: fightersRed.length - idxRed,
    survivorsBlue: fightersBlue.length - idxBlue,
    winnerTeam: idxRed < fightersRed.length ? redTeam.name : blueTeam.name,
  };
};
