import create from "zustand";
import { Note, NotesStore } from "../types";

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  setNote: (note) =>
    set((state) => ({
      notes: state.notes
        .filter((storeNote) => storeNote.id !== note.id)
        .concat(note),
    })),
  setNotes: (notes) =>
    set(() => ({
      notes,
    })),
}));
