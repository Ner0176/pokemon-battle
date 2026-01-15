export const simulateBattle = (teamA, teamB) => {
  let fightersA = [...teamA.team];
  let fightersB = [...teamB.team];

  const history = []; // Almacena el historial de rondas con los Pokémon completos

  let currentPokemonAIndex = 0; // Índice del Pokémon actual en el campo de batalla de A
  let currentPokemonBIndex = 0; // Índice del Pokémon actual en el campo de batalla de B

  while (
    currentPokemonAIndex < fightersA.length &&
    currentPokemonBIndex < fightersB.length
  ) {
    const p1 = fightersA[currentPokemonAIndex];
    const p2 = fightersB[currentPokemonBIndex];

    const speed1 = p1.stats.find((s) => s.name === "SPE").score;
    const attack1 = p1.stats.find((s) => s.name === "ATK").score;
    const defense1 = p1.stats.find((s) => s.name === "DEF").score;

    const speed2 = p2.stats.find((s) => s.name === "SPE").score;
    const attack2 = p2.stats.find((s) => s.name === "ATK").score;
    const defense2 = p2.stats.find((s) => s.name === "DEF").score;

    let winnerPokemon; // Referencia al objeto ganador
    let loserPokemon; // Referencia al objeto perdedor

    const firstAttacker =
      speed1 >= speed2
        ? { p: p1, att: attack1, def: defense1 }
        : { p: p2, att: attack2, def: defense2 };
    const secondAttacker =
      speed1 >= speed2
        ? { p: p2, att: attack2, def: defense2 }
        : { p: p1, att: attack1, def: defense1 };

    if (firstAttacker.att > secondAttacker.def) {
      winnerPokemon = firstAttacker.p;
      loserPokemon = secondAttacker.p;
    } else if (secondAttacker.att > firstAttacker.def) {
      winnerPokemon = secondAttacker.p;
      loserPokemon = firstAttacker.p;
    } else {
      // Empate de fuerza, gana el más rápido
      winnerPokemon = firstAttacker.p;
      loserPokemon = secondAttacker.p;
    }

    // Registrar resultado de la ronda con los objetos completos
    history.push({
      pokemonA: p1,
      pokemonB: p2,
      winner: winnerPokemon.name,
      loser: loserPokemon.name,
      roundWinnerTeam: winnerPokemon.id === p1.id ? teamA.name : teamB.name,
    });

    // Actualizar los índices de los Pokémon para la siguiente ronda
    if (winnerPokemon.id === p1.id) {
      currentPokemonBIndex++; // El Pokémon de B es derrotado, el siguiente de B entra
    } else {
      currentPokemonAIndex++; // El Pokémon de A es derrotado, el siguiente de A entra
    }
  }

  return {
    winnerTeam:
      currentPokemonAIndex < fightersA.length ? teamA.name : teamB.name,
    history, // Ahora cada entrada tiene pokemonA y pokemonB completos
    survivorsA: fightersA.length - currentPokemonAIndex,
    defeatedA: currentPokemonAIndex,
    survivorsB: fightersB.length - currentPokemonBIndex,
    defeatedB: currentPokemonBIndex,
  };
};
