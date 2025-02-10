import { create } from "zustand";

interface ModalOpenState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModalFilters = create<ModalOpenState>((set) => ({
  isOpen: false,
  params: null,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));

export default useModalFilters;
