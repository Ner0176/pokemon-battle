import { describe, test, expect } from "vitest";
import { simulateBattle } from "./battle-arena.utils";

const mockT = (key) => key;

const createPokemon = ({ id, name, atk, def, speed }) => ({
  id,
  name,
  stats: { SPE: speed, ATK: atk, DEF: def },
});

const createTeam = (name, pokemon) => ({
  name,
  team: pokemon,
});

describe("Lógica de Combate (simulateBattle)", () => {
  test("Caso 1: El Pokémon rápido gana si su ataque supera la defensa rival", () => {
    const charizard = createPokemon({
      id: 1,
      atk: 109,
      def: 85,
      speed: 100,
      name: "Charizard",
    });

    const kakuna = createPokemon({
      id: 2,
      atk: 25,
      def: 50,
      speed: 35,
      name: "Kakuna",
    });

    const teamRed = createTeam("Red Team", [charizard]);
    const teamBlue = createTeam("Blue Team", [kakuna]);

    const result = simulateBattle(teamRed, teamBlue, mockT);

    expect(result.winnerTeam).toBe("Red Team");
    expect(result.history[0].winner).toBe("Charizard");
  });

  test("Caso 2: El Pokémon lento gana si resiste y contraataca", () => {
    const pidgeot = createPokemon({
      id: 1,
      atk: 80,
      def: 75,
      speed: 101,
      name: "Pidgeot",
    });

    const venusaur = createPokemon({
      id: 2,
      atk: 100,
      def: 100,
      spped: 80,
      name: "Venusaur",
    });

    const teamRed = createTeam("Red Team", [pidgeot]);
    const teamBlue = createTeam("Blue Team", [venusaur]);

    const result = simulateBattle(teamRed, teamBlue, mockT);

    expect(result.winnerTeam).toBe("Blue Team");
    expect(result.history[0].winner).toBe("Venusaur");
  });

  test("Caso 3: Si nadie rompe la defensa, gana el más rápido", () => {
    const fastMetapod = createPokemon({
      id: 1,
      atk: 5,
      def: 100,
      speed: 200,
      name: "FastMetapod",
    });

    const slowMetapod = createPokemon({
      id: 2,
      atk: 5,
      def: 100,
      speed: 100,
      name: "SlowMetapod",
    });

    const teamRed = createTeam("Red Team", [fastMetapod]);
    const teamBlue = createTeam("Blue Team", [slowMetapod]);

    const result = simulateBattle(teamRed, teamBlue, mockT);

    expect(result.winnerTeam).toBe("Red Team");
    expect(result.history[0].winner).toBe("FastMetapod");
  });
});
