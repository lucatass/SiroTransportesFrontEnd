import { create } from "zustand";
import { RemitoDto } from "../types/types";

interface RemitosStore {
  selectedRemito: RemitoDto | null;
  isFormOpen: boolean;
  openForm: (remito: RemitoDto | null) => void;
  closeForm: () => void;
}

const useRemitosStore = create<RemitosStore>((set) => ({
  selectedRemito: null,
  isFormOpen: false,

  // Funciones para manejar el formulario
  openForm: (remito) => set({ isFormOpen: true, selectedRemito: remito }),
  closeForm: () => set({ isFormOpen: false, selectedRemito: null }),
}));

export default useRemitosStore;