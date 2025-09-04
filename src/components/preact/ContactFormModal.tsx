import { isContactModalOpen, closeContactModal } from '../../store/modalStore'
import { ContactForm } from './ContactForm'

export function ContactFormModal() {
  if (!isContactModalOpen.value) return

  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm'>
      <article className='relative mx-auto w-full max-w-lg'>
        <button
          aria-label='Close Contact Form'
          type='button'
          className='absolute top-4 right-4 z-5 rounded-full p-1 text-white/70 transition-all duration-250 hover:cursor-pointer hover:bg-white/15 hover:text-white'
          onClick={closeContactModal}
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
