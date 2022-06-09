import { useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { useState } from "react";
import { useSignUpMutation } from "../hooks";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const SignUp: NextPage = () => {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [show, setShow] = useState(false);
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
          className={"border-2 border-gray-200 p-1 rounded-md mt-2"}
          placeholder={"Name"}
          name={"name"}
          onChange={(e) => {
            setCreds((cur) => ({
              ...cur,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        <input
          type={"text"}
          className={"border-2 border-gray-200 p-1 rounded-md mt-2"}
          placeholder={"Email"}
          name={"email"}
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
          className={`mt-4 rounded-md bg-slate-900 hover:bg-slate-700 p-2 text-white min-w-0`}
          onClick={() => {
            if (signUpMutation.isLoading) {
              return;
            }
            signUpMutation.mutate(creds);
          }}
        >
          {signUpMutation.isLoading ? "SigningUp..." : "SignUp"}
        </button>
        <section className="flex justify-center mt-2">
          <p>Don&apos;t have an account?</p>&nbsp;
          <Link href={"/signin"}>
            <a className={"font-bold"}>SignIn</a>
          </Link>
        </section>
      </section>
    </Layout>
  );
};

export default SignUp;
