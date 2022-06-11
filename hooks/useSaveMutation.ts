import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Note } from "../types";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { Dispatch, SetStateAction } from "react";

export function useSaveMutation(setSaved: Dispatch<SetStateAction<boolean>>) {
  return useMutation(
    async ({ id, content }: { id: string; content: string }) => {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, {
        content,
      });
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
