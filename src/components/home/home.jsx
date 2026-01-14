import { useNavigate } from "react-router-dom";
import { usePokemonTeams } from "../stores";

export const HomeDashboard = () => {
  const navigate = useNavigate();

  const pokemonTeams = usePokemonTeams();

  const showTeamDetails = (teamId) => {
    navigate(`/team-builder?id=${teamId}`);
  };

  return (
    <div className="w-full h-screen border px-10 py-6">
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="size-full bg-black/20 rounded-2xl px-6 py-4">
          <div className="flex flex-col gap-3 overflow-y-auto">
            <span className="text-xl">Mis equipos</span>
            {pokemonTeams.map(({ id, name, team }) => {
              return (
                <div
                  onClick={() => showTeamDetails(id)}
                  className="flex flex-col gap-2 w-full bg-white border border-neutral-200 rounded-lg py-2 px-4 cursor-pointer hover:shadow-md hover:bg-neutral-50"
                >
                  <span>{name}</span>
                  <div className="flex flex-row items-center gap-3">
                    {team.map((pkm) => (
                      <img
                        className="size-10"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkm.id}.png`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/team-builder")}
            className="bg-emerald-500 text-white rounded-xl px-10 py-6 text-lg cursor-pointer hover:shadow-md"
          >
            Crear equipo
          </button>
        </div>
      </div>
    </div>
  );
};
