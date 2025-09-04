import { signal } from '@preact/signals'

export const isContactModalOpen = signal(false)

export const openContactModal = () => (isContactModalOpen.value = true)
export const closeContactModal = () => (isContactModalOpen.value = false)
