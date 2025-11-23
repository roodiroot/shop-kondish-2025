import { create } from "zustand";

interface ModalOpenState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useFeedBack = create<ModalOpenState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useFeedBack;
