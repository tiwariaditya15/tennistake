import type { NextPage } from "next";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { useGlobalStore } from "../store";

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
  return <></>;
};

export default Home;
