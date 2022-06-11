import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useRouter } from "next/router";

export function useDeleteMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    async (id: string) => {
      try {
        await deleteDoc(doc(db, "notes", id));
        return true;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    {
      onError: (error: any) => {
        toast.error("Couldn't delete note.", {
          position: "bottom-right",
        });
      },
      onSuccess: (docRef) => {
        queryClient.invalidateQueries("notes");
        toast.success("Note deleted.", {
          position: "bottom-right",
        });
        router.push("/");
      },
    }
  );
}
