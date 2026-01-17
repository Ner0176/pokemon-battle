import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDraftStore = create(
  persist(
    (set) => ({
      draftTeam: [],
      saveDraft: (team) => set(() => ({ draftTeam: team })),
      clearDraft: () => set(() => ({ draftTeam: [] })),
    }),
    { name: "draft-team", getStorage: () => localStorage },
  ),
);

export const useGetDraft = () => useDraftStore((state) => state.draftTeam);
export const useSaveDraft = () => useDraftStore((state) => state.saveDraft);
export const useClearDraft = () => useDraftStore((state) => state.clearDraft);
