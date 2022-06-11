import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { useGlobalStore } from "../store";
import { NotesDeck } from "../components/NotesDeck";
import Image from "next/image";
import tennis from "../public/assets/tennis.jpg";
import { MaterialSymbolsMenu } from "../components/icons";

const Home: NextPage = () => {
  const setEmail = useGlobalStore((state) => state.setEmail);
  const router = useRouter();
  const [sideNav, setSideNav] = useState(false);
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
    <section className="grid grif-cols-5 md:grid-cols-6">
      <NotesDeck />
      <button
        onClick={() => setSideNav((cur) => !cur)}
        className={"md:hidden p-2"}
      >
        <MaterialSymbolsMenu />
      </button>

      <section className="flex w-3/4 mx-auto justify-center col-span-5 h-screen">
        <Image src={tennis} alt={"Tennis Illustration"} />
      </section>
    </section>
  );
};

export default Home;
