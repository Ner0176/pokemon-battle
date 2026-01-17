import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTeamStore = create(
  persist(
    (set) => ({
      pokemonTeams: [],
      create: (newTeam) =>
        set((state) => ({
          pokemonTeams: [
            ...state.pokemonTeams,
            {
              name: newTeam.name,
              team: newTeam.pokemon,
              id: crypto.randomUUID(),
            },
          ],
        })),
      update: (updatedTeam) =>
        set((state) => ({
          pokemonTeams: state.pokemonTeams.map((team) =>
            team.id === updatedTeam.id ? updatedTeam : team,
          ),
        })),
      delete: (teamId) =>
        set((state) => ({
          pokemonTeams: state.pokemonTeams.filter(({ id }) => id !== teamId),
        })),
    }),
    {
      name: "pokemon-teams",
      getStorage: () => localStorage,
    },
  ),
);

export const usePokemonTeams = () =>
  useTeamStore((state) => state.pokemonTeams);
export const useCreatePkmTeam = () => useTeamStore((state) => state.create);
export const useUpdatePkmTeam = () => useTeamStore((state) => state.update);
export const useDeletePkmTeam = () => useTeamStore((state) => state.delete);
