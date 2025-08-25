import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNoteData } from "../api";

export const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: NewNoteData) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "notehub-draft", partialize: (state) => ({ draft: state.draft }) }
  )
);
