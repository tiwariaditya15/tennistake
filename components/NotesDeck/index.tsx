import { useRouter } from "next/router";
import { useState } from "react";
import { useNotes } from "../../hooks/useNotes";
import { useGlobalStore } from "../../store";
import { CreateTitle } from "../CreateTitle";
import { IonCreateOutline } from "../icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Note from "./Note";

export function NotesDeck() {
  const { email, setEmail } = useGlobalStore((state) => state);
  const router = useRouter();
  const [createTitle, setCreateTitle] = useState(false);
  const { data: notes } = useNotes();

  const notesList = notes?.map((note) => <Note note={note} key={note["id"]} />);
  return (
    <section className="flex flex-col justify-between bg-slate-900 text-white h-screen hidden md:flex">
      <section className="flex flex-col">
        <section className="flex justify-end p-4 cursor-pointer w-full">
          <span onClick={() => setCreateTitle((cur) => !cur)}>
            <IonCreateOutline width={"1.5rem"} height={"1.5rem"} />
          </span>
        </section>
        {createTitle ? <CreateTitle /> : null}
        {notesList}
      </section>
      <section className="flex justify-center">
        {email?.length ? (
          <button
            className="bg-slate-700 py-2 px-4 rounded-sm w-full"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  toast.success("Signed out.", {
                    position: "bottom-right",
                  });
                  setEmail(null);
                })
                .catch(() => {
                  toast.error("Couldn't sign out. Try again!", {
                    position: "bottom-right",
                  });
                });
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-slate-700 py-2 px-4 rounded-sm w-full"
            onClick={() => router.push("/")}
          >
            Login
          </button>
        )}
      </section>
    </section>
  );
}
