import create from "zustand";

export const useGlobalStore = create<{
  email: string | null;
  setEmail: (email: string) => void;
}>((set) => ({
  email: null,
  setEmail: (email: string) => set(() => ({ email })),
}));
