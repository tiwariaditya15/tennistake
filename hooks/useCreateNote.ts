import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useGlobalStore } from "../store";

export function useCreateNote(setNoteTitle: Dispatch<SetStateAction<string>>) {
  const email = useGlobalStore((state) => state.email);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async (title: string): Promise<any> => {
      const docRef = await addDoc(collection(db, "notes"), {
        title,
        content: "",
        email,
      });
      return docRef;
    },
    {
      onError: (error: any) => {
        toast.error("Couldn't create note.", {
          position: "bottom-right",
        });
      },
      onSuccess: (docRef) => {
        queryClient.invalidateQueries("notes");
        toast.success("Created note.", {
          position: "bottom-right",
        });
        setNoteTitle("");
      },
    }
  );
}
