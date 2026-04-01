"use client";

import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
}

interface AppStore {
  toast: ToastState;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<AppStore>((set) => ({
  toast: { message: "", type: "info", isVisible: false },
  showToast: (message, type = "info") => {
    set({ toast: { message, type, isVisible: true } });
    setTimeout(() => {
      set((state) => ({ toast: { ...state.toast, isVisible: false } }));
    }, 3000);
  },
  hideToast: () =>
    set((state) => ({ toast: { ...state.toast, isVisible: false } })),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
