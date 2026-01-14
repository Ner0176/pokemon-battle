import { useState } from "react";
import { SelectedPokemon } from "./team.content";
import { useCreatePkmTeam } from "../../stores";

export const TeamSection = ({ pkmTeam, setPkmTeam }) => {
  const createTeam = useCreatePkmTeam();

  const [action, setAction] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleClick = (id) => {
    if (action === "delete") {
      setPkmTeam((prev) => {
        return prev.filter((pkm) => pkm.id !== id);
      });
    } else if (action === "random-order") {
      setPkmTeam((prev) => {
        return [...prev].sort(() => Math.random() - 0.5);
      });
    }
  };

  const handleSort = () => {
    setPkmTeam((prev) => {
      return [...prev].sort(() => Math.random() - 0.5);
    });
  };

  const handleSortByAttack = () => {
    setPkmTeam((prev) => {
      return [...prev].sort((a, b) => {
        const attackA = a.stats.find((s) => s.name === "attack")?.score || 0;
        const attackB = b.stats.find((s) => s.name === "attack")?.score || 0;
        return attackB - attackA;
      });
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <div className="flex flex-row gap-2 justify-between w-full">
        <div className="w-fit border border-neutral-200 rounded-xl ">
          <input
            value={teamName}
            placeholder="Nombre del equipo..."
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full py-2 px-4 rounded-2xl focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={handleSort}
            className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
          >
            Ordenar aleatorio
          </button>
          <button
            onClick={handleSortByAttack}
            className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
          >
            Ordenar por ataque
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {pkmTeam.map((item) => (
          <div key={item.name} onClick={() => handleClick(item.id)}>
            <SelectedPokemon action={action} pokemon={item} />
          </div>
        ))}
        {[...Array(6 - pkmTeam.length)].map((_, idx) => {
          return (
            <div
              key={idx}
              className="border-2 border-neutral-200  rounded-xl w-full h-20"
            ></div>
          );
        })}
      </div>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() =>
            setAction((prev) => {
              return prev === "delete" ? "" : "delete";
            })
          }
          className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
        >
          Eliminar
        </button>
        <button
          onClick={() =>
            createTeam({ name: teamName ?? "Equipo X", pokemon: pkmTeam })
          }
          className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
        >
          Crear
        </button>
      </div>
    </div>
  );
};
