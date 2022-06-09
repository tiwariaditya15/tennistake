import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSignInMutation } from "../hooks";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [creds, setCreds] = useState({
    password: "aditya@123",
    email: "tiwariaditya@reddit.com",
  });

  const [show, setShow] = useState(false);
  const signInMutation = useSignInMutation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <section className="flex flex-col w-3/4 md:w-1/4 align-center mt-4 mx-auto">
        <input
          type={"text"}
          name={"email"}
          className={"border-2 border-gray-200 p-1 rounded-md mt-2"}
          placeholder={"Email"}
          value={creds["email"]}
          onChange={(e) => {
            setCreds((cur) => ({
              ...cur,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        <section className="relative mt-4 w-full">
          <input
            type={!show ? "password" : "text"}
            name={"password"}
            className={"border-2 border-gray-200 p-1 rounded-md w-full"}
            placeholder={"Password"}
            value={creds["password"]}
            onChange={(e) => {
              setCreds((cur) => ({
                ...cur,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <p
            className="absolute top-1 text-slate-400 cursor-pointer right-4"
            onClick={() => setShow((cur) => !cur)}
          >
            {show ? "hide" : "show"}
          </p>
        </section>
        <button
          className="mt-4 rounded-md bg-slate-700 hover:bg-slate-900 p-2 text-white min-w-0"
          onClick={() => {
            if (signInMutation.isLoading) {
              return;
            }
            signInMutation.mutate(creds);
          }}
        >
          {signInMutation.isLoading ? "SigningIn..." : "SignIn"}
        </button>
        <section className="flex justify-center mt-2">
          <p>Already have an account?</p>&nbsp;
          <Link href={"/signup"}>
            <a className={"font-bold"}>SignUp</a>
          </Link>
        </section>
      </section>
    </Layout>
  );
};

export default SignIn;
