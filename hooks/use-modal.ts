import { create } from "zustand";

interface ModalOpenState {
  isOpen: boolean;
  params: "LOGIN" | "REGISTER" | null;
  onOpen: (params?: "LOGIN" | "REGISTER" | null) => void;
  onClose: () => void;
}

const useModal = create<ModalOpenState>((set) => ({
  isOpen: false,
  params: null,
  onOpen: (params) => {
    if (params) {
      set({ isOpen: true, params });
    }
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false, params: null }),
}));

export default useModal;
