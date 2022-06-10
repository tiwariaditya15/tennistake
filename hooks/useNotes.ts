import { useQuery } from "react-query";
import { getDocs, collection, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useGlobalStore, useNotesStore } from "../store";
import { toast } from "react-toastify";

type Note = { id: string; title: string; content: string; email: string };

export function useNotes() {
  const email = useGlobalStore((state) => state.email);
  const setNotes = useNotesStore((state) => state.setNotes);
  return useQuery(
    ["notes", email],
    async (): Promise<Array<Note>> => {
      try {
        const q = query(collection(db, "notes"), where("email", "==", email));

        const querySnapshot = await getDocs(q);

        const notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          const note: any = doc.data();
          notes.push({ ...note, id: doc.id });
        });
        setNotes(notes);
        return notes;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    {
      onError: (error: any) => {
        toast.error("Couldn't fetch notes.", {
          position: "bottom-right",
        });
      },
    }
  );
}
