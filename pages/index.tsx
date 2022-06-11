import type { NextPage } from "next";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { useGlobalStore } from "../store";
import { NotesDeck } from "../components/NotesDeck";
import Image from "next/image";
import tennis from "../public/assets/tennis.jpg";

const Home: NextPage = () => {
  const email = useGlobalStore((state) => state.email);
  const setEmail = useGlobalStore((state) => state.setEmail);
  const router = useRouter();

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
      <section className="flex w-3/4 mx-auto justify-center col-span-5 h-screen">
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <Image src={tennis} alt={"Tennis Illustration"} />
      </section>
    </section>
  );
};

export default Home;
