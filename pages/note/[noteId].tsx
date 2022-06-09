import type { NextPage } from "next";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useGlobalStore } from "../../store";
import { NotesDeck } from "../../components/NotesDeck";
import Editor from "../../components/Editor";

const Note: NextPage = () => {
  const email = useGlobalStore((state) => state.email);
  const setEmail = useGlobalStore((state) => state.setEmail);
  const router = useRouter();
  const { noteId } = router["query"];
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/signin");
        return;
      }
      if (user.email) setEmail(user.email);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="grid grid-cols-6">
      <NotesDeck />
      <section className="col-span-5">
        <Editor noteId={noteId as string} initialContent={"Hello there!"} />
      </section>
    </section>
  );
};

export default Note;
