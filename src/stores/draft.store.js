import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDraftStore = create(
  persist(
    (set) => ({
      draftTeam: null,
      clearDraft: () => set(() => ({ draftTeam: null })),
      saveDraft: (unsavedTeam) => set(() => ({ draftTeam: unsavedTeam })),
    }),
    { name: "draft-team", getStorage: () => localStorage },
  ),
);

export const useGetDraft = () => useDraftStore((state) => state.draftTeam);
export const useSaveDraft = () => useDraftStore((state) => state.saveDraft);
export const useClearDraft = () => useDraftStore((state) => state.clearDraft);
