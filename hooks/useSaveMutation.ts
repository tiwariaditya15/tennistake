import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNotesStore } from "../store/";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { Dispatch, SetStateAction } from "react";
import { Note } from "../types";

export function useSaveMutation(setSaved: Dispatch<SetStateAction<boolean>>) {
  const { notes, setNotes } = useNotesStore();
  return useMutation(
    async ({ id, content }: { id: string; content: string }) => {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, {
        content,
      });
      const updatedNotes = notes.reduce((acc: Note[], cur) => {
        if (cur.id === id) {
          return [...acc, { ...cur, content }];
        }
        return [...acc, cur];
      }, []);
      setNotes(updatedNotes);
      return { id, content };
    },
    {
      onError: (error: any) => {
        toast.error("Couldn't save note.", {
          position: "bottom-right",
        });
      },
      onSuccess: (docRef) => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      },
    }
  );
}
