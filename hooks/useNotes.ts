import { useQuery } from "react-query";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useGlobalStore } from "../store";
import { toast } from "react-toastify";

export function useNotes() {
  const email = useGlobalStore((state) => state.email);
  return useQuery(
    ["notes", email],
    async () => {
      try {
        const q = query(collection(db, "notes"), where("email", "==", email));

        const querySnapshot = await getDocs(q);

        const notes = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
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
