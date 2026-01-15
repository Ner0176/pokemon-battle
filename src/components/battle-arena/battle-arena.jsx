/* eslint-disable no-unused-vars */
import { useState } from "react";
import { usePokemonTeams } from "../stores";
import { simulateBattle } from "./battle-arena.utils";
import { useEffect } from "react";
import { Container } from "../base";
import { BattleTeamInfo, FightingPokemon } from "./battle-arena.content";

export const BattleArena = () => {
  const teams = usePokemonTeams();
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 significa "Cargando/Inicio"
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. Ejecutar la simulación al montar el componente
  useEffect(() => {
    if (teams.length >= 2) {
      const result = simulateBattle(teams[0], teams[1]);
      setHistory(result.history);
      setCurrentIndex(0); // Empezamos la primera ronda
    }
  }, [teams]);

  // 2. Lógica de progresión automática
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < history.length) {
      setIsAnimating(true);

      // Simulamos la duración de la "batalla" (ej. 3 segundos por ronda)
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Si queremos que pase a la siguiente ronda automáticamente:
        // setCurrentIndex(prev => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, history]);

  // Obtenemos los combatientes actuales del historial
  const currentRound = history[currentIndex];
  const p1 = currentRound?.pokemonA;
  const p2 = currentRound?.pokemonB;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 h-full">
        <div className="col-span-2 h-full">
          <div className="relative h-1/2 border border-neutral-200 rounded-xl bg-[url('...')] bg-cover">
            {/* Solo mostramos si existen en la ronda actual */}
            {p1 && (
              <FightingPokemon
                pokemon={p1}
                isAttacking={isAnimating}
                isLoser={!isAnimating && currentRound.loser === p1.name}
              />
            )}

            {p2 && (
              <FightingPokemon
                variant="right"
                pokemon={p2}
                isAttacking={isAnimating}
                isLoser={!isAnimating && currentRound.loser === p2.name}
              />
            )}

            <BattleTeamInfo teamDetails={teams[0]} />
            <BattleTeamInfo teamDetails={teams[1]} variant="right" />
          </div>

          {/* Botón opcional para avanzar manualmente o debug */}
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Siguiente Ronda
          </button>
        </div>

        <div className="flex flex-col bg-white w-full h-full rounded-2xl py-4 px-8 overflow-y-auto">
          <span className="text-lg text-center font-bold mb-4">Historial</span>
          {history.slice(0, currentIndex + 1).map((event, i) => (
            <div key={i} className="text-sm border-b py-2 animate-fade-in">
              <span className="font-bold">{event.pokemonA.name}</span> vs{" "}
              <span className="font-bold">{event.pokemonB.name}</span>
              <p className="text-gray-600">¡Ganador: {event.winner}!</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
