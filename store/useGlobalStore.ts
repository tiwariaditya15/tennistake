import create from "zustand";
import { GlobalStore } from "../types";

export const useGlobalStore = create<GlobalStore>((set) => ({
  email: null,
  setEmail: (email: string) => set(() => ({ email })),
}));
