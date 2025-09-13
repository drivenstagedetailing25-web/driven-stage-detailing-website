import { useContactModal } from '../../store/modalStore'
import { ContactForm } from './ContactForm'
import { useEffect, useState } from 'react'

export function ContactFormModal() {
  const isOpen = useContactModal((state) => state.isOpen)
  const closeContactModal = useContactModal((state) => state.closeContactModal)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      closeContactModal()
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center backdrop-blur-sm transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/85 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <article
        className={`relative mx-auto w-full max-w-lg transition-all duration-300 ease-out ${
          isAnimating
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        <button
          aria-label='Close Contact Form'
          type='button'
          className='absolute top-4 right-4 z-10 rounded-full p-1 text-white/70 transition-all duration-250 hover:scale-110 hover:cursor-pointer hover:bg-white/15 hover:text-white'
          onClick={handleClose}
        >
          <X />
        </button>
        <ContactForm />
      </article>
    </div>
  )
}

function X() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-5.5'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18 18 6M6 6l12 12'
      />
    </svg>
  )
}
