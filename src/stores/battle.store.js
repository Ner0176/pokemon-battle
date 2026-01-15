import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBattleStore = create(
  persist(
    (set) => ({
      teams: { blueTeam: undefined, redTeam: undefined },
      selectTeamsToFight: (selectedTeams) =>
        set(() => ({ teams: selectedTeams })),
      historic: [],
      addBattleToHistoric: (battle) =>
        set((state) => ({ historic: [...state, battle] })),
    }),
    {
      name: "pokemon-battles",
      getStorage: () => localStorage,
    }
  )
);

export const useGetBattleHistoric = () =>
  useBattleStore((state) => state.historic);

export const useAddBattleToHistoric = () =>
  useBattleStore((state) => state.addBattleToHistoric);

export const useGetBattleTeams = () => useBattleStore((state) => state.teams);

export const useSelectTeamsToFight = () =>
  useBattleStore((state) => state.selectTeamsToFight);
