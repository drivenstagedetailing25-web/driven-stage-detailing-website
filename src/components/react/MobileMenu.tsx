import { useState, useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showServiceItems, setShowServiceItems] = useState(false)

  const services = [
    { name: 'All Services', href: '/services' },
    { name: 'Mobile Detailing', href: '/services/mobile-detailing' },
    { name: 'Paint Correction', href: '/services/paint-correction' },
    { name: 'Ceramic Coating', href: '/services/ceramic-coating' },
  ]

  const toggleServices = () => {
    if (isServicesOpen) {
      // Cerrar: primero ocultar items, luego cerrar contenedor
      setShowServiceItems(false)
      setTimeout(() => setIsServicesOpen(false), 200)
    } else {
      // Abrir: primero abrir contenedor, luego mostrar items
      setIsServicesOpen(true)
      setTimeout(() => setShowServiceItems(true), 150)
    }
  }

  const handleLinkClick = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      setIsServicesOpen(false)
      setShowServiceItems(false)
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-out lg:hidden ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Side Menu */}
      <aside
        className={`bg-dark fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform border-l border-gray-800 transition-transform duration-400 ease-out lg:hidden ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className='flex items-center justify-between border-b border-gray-800 p-6'>
          <div className='flex items-center space-x-3'>
            <img
              src='/images/logo.webp'
              alt='Driven Stage Detailing Logo'
              className='h-12 w-auto brightness-110 contrast-125'
            />
            <div>
              <p className='text-sm font-bold text-white'>DRIVEN STAGE</p>
              <p className='text-gradient-primary text-xs font-medium'>
                DETAILING
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={handleLinkClick}
            className='btn rounded-lg bg-white/10 p-2 transition-colors duration-300 ease-out hover:bg-white/20'
            aria-label='Close menu'
          >
            <svg
              className='h-5 w-5 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className='font-barlow flex flex-col p-6 text-3xl'>
          <a
            href='/'
            className={`menu-item-delay-1 block transform rounded-lg px-4 py-4 font-medium text-white transition-all duration-700 ease-out hover:bg-white/10 hover:duration-300 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            onClick={handleLinkClick}
          >
            HOME
          </a>

          <div
            className={`menu-item-delay-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              type='button'
              onClick={toggleServices}
              className='flex w-full items-center justify-between rounded-lg px-4 py-4 font-medium text-white transition-all duration-300 ease-out hover:bg-white/10 hover:cursor-pointer'
            >
              OUR SERVICES
              <svg
                className={`h-4 w-4 transition-transform duration-300 ease-out ${isServicesOpen ? 'rotate-180' : ''}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-400 ease-out ${
              isServicesOpen ? 'max-h-80 mt-2' : 'max-h-0 mt-0'
            }`}>
              <ul className='ml-4 space-y-1'>
                {services.map((service, index) => (
                  <li
                    key={index}
                    className={`transform transition-all duration-700 ease-out service-item-delay-${index + 1} ${
                      showServiceItems
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <a
                      href={service.href}
                      className='text-muted block rounded-lg px-4 py-3 transition-all duration-300 ease-out hover:bg-white/5 hover:text-white text-xl'
                      onClick={handleLinkClick}
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href='/about'
            className={`menu-item-delay-3 block transform rounded-lg px-4 py-4 font-medium text-white transition-all duration-700 ease-out hover:bg-white/10 hover:duration-300 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            onClick={handleLinkClick}
          >
            ABOUT US
          </a>

          <a
            href='/contact'
            className={`menu-item-delay-4 block transform rounded-lg px-4 py-4 font-medium text-white transition-all duration-700 ease-out hover:bg-white/10 hover:duration-300 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            onClick={handleLinkClick}
          >
            CONTACT
          </a>
        </nav>
      </aside>
    </>
  )
}
