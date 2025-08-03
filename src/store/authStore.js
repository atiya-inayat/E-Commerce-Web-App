// store/authStore.js
import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  checkAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user });
    });
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
      console.log("Logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
