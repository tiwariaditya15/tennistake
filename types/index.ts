export type Note = {
  title: string;
  content: string;
  email: string;
  id: string;
};

export type NotesStore = {
  notes: Array<Note>;
  setNote: (note: Note) => void;
  setNotes: (notes: Array<Note>) => void;
};

export type GlobalStore = {
  email: string | null;
  setEmail: (email: string) => void;
};
