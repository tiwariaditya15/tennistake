import { useEffect, useState } from "react";
import { useCreateNote } from "../../hooks";

export function CreateTitle() {
  const [noteTitle, setNoteTitle] = useState("");
  const createNote = useCreateNote(setNoteTitle);

  return (
    <section className="flex flex-col items-center py-2 w-full">
      <input
        type="text"
        name={"title"}
        placeholder={"Enter title"}
        className={
          "w-5/6 p-2 rounded-sm bg-slate-600 outline-none text-slate-200"
        }
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <button
        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-sm text-xs my-2 mx-1 self-end"
        onClick={() => {
          if (noteTitle.length < 4) return;
          if (createNote.isLoading) return;
          createNote.mutate(noteTitle);
        }}
      >
        Add
      </button>
    </section>
  );
}
