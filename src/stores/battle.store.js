import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBattleStore = create(
  persist(
    (set) => ({
      teams: { blueTeam: undefined, redTeam: undefined },
      selectTeamsToFight: (selectedTeams) =>
        set(() => ({ teams: selectedTeams })),
      history: [],
      addBattleToHistory: (battle) =>
        set((state) => ({ history: [...state.history, battle] })),
    }),
    {
      name: "pokemon-battles",
      getStorage: () => localStorage,
    },
  ),
);

export const useGetBattleHistory = () =>
  useBattleStore((state) => state.history);

export const useAddBattleToHistory = () =>
  useBattleStore((state) => state.addBattleToHistory);

export const useGetBattleTeams = () => useBattleStore((state) => state.teams);

export const useSelectTeamsToFight = () =>
  useBattleStore((state) => state.selectTeamsToFight);
