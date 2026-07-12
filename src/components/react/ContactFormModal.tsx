import { useContactModal } from '@/store/modalStore'
import { ContactForm } from './ContactForm'
import { useEffect, useState } from 'react'

export function ContactFormModal() {
  const isOpen = useContactModal((state) => state.isOpen)
  const preselectedSlugs = useContactModal((state) => state.preselectedSlugs)
  const closeContactModal = useContactModal((state) => state.closeContactModal)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const showSidePanel = preselectedSlugs.length > 0

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
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
        className={`relative mx-auto w-full transition-all duration-300 ease-out ${
          isAnimating
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-95 opacity-0'
        } ${showSidePanel ? 'max-w-[930px]' : 'max-w-lg'}`}
      >
        <button
          aria-label='Close Contact Form'
          type='button'
          className='absolute top-4 right-4 z-10 rounded-full p-1 text-white/70 transition-all duration-250 hover:scale-110 hover:cursor-pointer hover:bg-white/15 hover:text-white'
          onClick={handleClose}
        >
          <X />
        </button>

        {showSidePanel ? (
          <div className='flex max-h-[85dvh] flex-col overflow-y-auto md:grid md:max-h-none md:grid-cols-[1fr_auto_2fr] md:overflow-visible'>
            <div className='md:border-light/10 order-3 md:order-3 md:border-l'>
              <ContactForm
                preselectedSlugs={preselectedSlugs}
                blurredBackground
              />
            </div>

            <div className='order-2 flex items-center justify-center gap-3 py-3 md:hidden'>
              <div className='h-px flex-1 bg-zinc-600' />
              <span className='text-sm font-semibold tracking-widest text-zinc-400 uppercase'>
                or
              </span>
              <div className='h-px flex-1 bg-zinc-600' />
            </div>

            <div className='order-1 flex flex-col items-center justify-center gap-6 p-8 md:order-1'>
              <a
                href='tel:201-966-6990'
                className='cta-slab-phone w-full max-w-xs'
              >
                <span className='cta-icon'>
                  <Phone />
                </span>
                <span className='flex min-w-0 flex-col items-start gap-1 text-left'>
                  <span className='cta-main'>(201) 966-6990</span>
                  <span className='cta-meta'>8AM–6PM · Sunday-Friday</span>
                </span>
              </a>

              <a
                href='https://wa.me/12019666990'
                target='_blank'
                rel='noopener noreferrer'
                className='cta-slab-whatsapp w-full max-w-xs'
              >
                <span className='cta-icon'>
                  <WhatsApp />
                </span>
                <span className='flex min-w-0 flex-col items-start gap-1 text-left'>
                  <span className='cta-main'>WhatsApp</span>
                  <span className='cta-meta'>Text us now</span>
                </span>
              </a>
            </div>

            <div className='order-4 hidden items-center justify-center px-4 md:order-2 md:flex'>
              <div className='flex flex-col items-center gap-4'>
                <div className='h-full w-px bg-zinc-600' />
                <span className='text-sm font-semibold tracking-widest text-zinc-400 uppercase'>
                  or
                </span>
                <div className='h-full w-px bg-zinc-600' />
              </div>
            </div>
          </div>
        ) : (
          <ContactForm preselectedSlugs={preselectedSlugs} />
        )}
      </article>

      <style>{`
        .cta-slab-phone {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          min-height: 4.5rem;
          text-decoration: none;
          background: rgb(255 255 255 / 0.06);
          color: var(--color-light);
          border: 1px solid rgb(255 255 255 / 0.3);
          clip-path: polygon(3.5% 0, 100% 0, 96.5% 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.04);
          transition: transform 300ms ease, background 300ms ease, border-color 300ms ease;
        }
        .cta-slab-phone:hover {
          background: rgb(255 255 255 / 0.1);
          border-color: rgb(255 255 255 / 0.5);
        }
        .cta-slab-phone:hover .cta-main,
        .cta-slab-phone:hover .cta-meta {
          color: rgb(255 255 255 / 1);
        }

        .cta-slab-whatsapp {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          min-height: 4.5rem;
          text-decoration: none;
          background: #075e54;
          color: #ffffff;
          border: 1px solid rgba(255 255 255 / 0.2);
          clip-path: polygon(3.5% 0, 100% 0, 96.5% 100%, 0 100%);
          transition: transform 300ms ease, filter 300ms ease;
        }
        .cta-slab-whatsapp:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          width: 2rem;
          height: 2rem;
          color: inherit;
        }

        .cta-main {
          font-family: var(--font-barlow);
          font-size: clamp(1.1rem, 1.7vw, 1.9rem);
          font-weight: 600;
          letter-spacing: 0.03em;
          line-height: 1;
          white-space: nowrap;
        }

        .cta-meta {
          font-size: 0.81rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          opacity: 0.76;
          text-transform: uppercase;
          white-space: nowrap;
        }
      `}</style>
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

function Phone() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.35 2.24.54 3.43.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.06 21 3 13.94 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.19.19 2.35.54 3.43a1 1 0 0 1-.24 1l-2.2 2.37Z' />
    </svg>
  )
}

function WhatsApp() {
  return (
    <svg fill='none' viewBox='0 0 360 362'>
      <path
        fill='#fff'
        fill-rule='evenodd'
        d='M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z'
        clip-rule='evenodd'
      />
    </svg>
  )
}
