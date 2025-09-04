import type { ComponentChildren } from 'preact'
import { openContactModal } from '../../store/modalStore'

interface OpenContactModalButtonProps {
  children: ComponentChildren
  size?: 'sm' | 'base' | 'lg'
  fullWidth?: boolean
}

export function OpenContactModalButton({
  children,
  size = 'base',
  fullWidth = false,  
}: OpenContactModalButtonProps) {
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
