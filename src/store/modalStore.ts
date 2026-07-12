import { create } from 'zustand'

interface ContactModalState {
  isOpen: boolean
  preselectedSlugs: string[]
  openContactModal: (slugs?: string[]) => void
  closeContactModal: () => void
}

export const useContactModal = create<ContactModalState>((set) => ({
  isOpen: false,
  preselectedSlugs: [],
  openContactModal: (slugs) => set({ isOpen: true, preselectedSlugs: slugs ?? [] }),
  closeContactModal: () => set({ isOpen: false, preselectedSlugs: [] }),
}))
