import { useState } from "react";
import { useNotes } from "../../hooks/useNotes";
import { CreateTitle } from "../CreateTitle";
import { IonCreateOutline } from "../icons";
import Note from "./Note";

export function NotesDeck() {
  const [createTitle, setCreateTitle] = useState(false);
  const { data: notes } = useNotes();

  const notesList = notes?.map((note) => <Note note={note} key={note["id"]} />);
  return (
    <section className="flex flex-col bg-slate-900 text-white h-screen">
      <section className="flex justify-end p-4 cursor-pointer w-full">
        <span onClick={() => setCreateTitle((cur) => !cur)}>
          <IonCreateOutline width={"1.5rem"} height={"1.5rem"} />
        </span>
      </section>
      {createTitle ? <CreateTitle /> : null}
      {notesList}
    </section>
  );
}
