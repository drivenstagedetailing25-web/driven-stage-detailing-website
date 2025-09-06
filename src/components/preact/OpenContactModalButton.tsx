import { useContactModal } from '../../store/modalStore'

interface OpenContactModalButtonProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg'
  fullWidth?: boolean
}

export function OpenContactModalButton({
  children,
  size = 'base',
  fullWidth = false,
}: OpenContactModalButtonProps) {
  const openContactModal = useContactModal((state) => state.openContactModal)

  return (
    <button
      type='button'
      onClick={openContactModal}
      className={`btn btn-primary btn-${size} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}
