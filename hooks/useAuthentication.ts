import { useMutation } from "react-query";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const auth = getAuth();

export function useSignInMutation() {
  const router = useRouter();
  return useMutation(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<any> => {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    },
    {
      onError: (error: any) => {
        if (
          error?.["message"] ===
          "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Account already exists with email.", {
            position: "bottom-right",
          });
        }
      },
      onSuccess: () => {
        toast.success("Signed In successfully.", {
          position: "bottom-right",
        });
        router.push("/");
      },
    }
  );
}

export function useSignUpMutation() {
  const router = useRouter();
  return useMutation(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<any> => {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredentials.user;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    {
      onError: (error: any) => {
        if (
          error?.["message"] ===
          "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Account already exists with email.", {
            position: "bottom-right",
          });
        }
      },
      onSuccess: () => {
        toast.success("Created account successfully.", {
          position: "bottom-right",
        });
        router.push("/");
      },
    }
  );
}
