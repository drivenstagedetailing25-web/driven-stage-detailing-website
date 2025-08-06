import { useState, useEffect, useRef } from 'preact/hooks'

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHome, setIsHome] = useState(true)
  const servicesRef = useRef<HTMLButtonElement>(null)

  const services = [
    { name: 'Mobile Detailing', href: '/services/mobile-detailing' },
    { name: 'Paint Correction', href: '/services/paint-correction' },
    { name: 'Ceramic Coating', href: '/services/ceramic-coating' },
  ]

  const toggleServices = () => setIsServicesOpen(!isServicesOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    setIsHome(window.location.pathname === '/')
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header class={`absolute top-0 right-0 left-0 z-50 h-[16dvh] lg:h-[20dvh] xl:h-[24dvh] ${isHome ? 'bg-transparent' : 'bg-dark'}`}>
      <div class='container mx-auto flex items-center justify-between px-6 py-4 h-full'>
      {/* Logo and Brand */}
      <div class='relative flex w-full items-center justify-between lg:w-auto'>
        <a
          href='/'
          class='flex items-center space-x-3'
          aria-label='Driven Stage Detailing - Home'
        >
          <img
            src='/images/logo.png'
            alt='Driven Stage Detailing Logo'
            class='h-24 w-auto brightness-110 contrast-125 md:h-32'
          />
          <div class='hidden sm:block'>
            <p class='text-xl font-bold text-white'>DRIVEN STAGE</p>
            <p class='text-gradient-primary font-medium'>DETAILING</p>
          </div>
        </a>

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={toggleMobileMenu}
          class='rounded-lg bg-white/10 p-2 lg:hidden'
          aria-label='Toggle mobile menu'
        >
          <svg
            class='h-6 w-6 text-white transition-colors duration-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {isMobileMenuOpen ? (
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Navigation */}

        {isMobileMenuOpen && (
          <nav class='bg-dark animate-slide-up absolute top-full mt-4 w-full border-t px-4 pb-4 text-white lg:hidden'>
            <a
              href='/'
              class='block rounded-lg py-3 font-medium transition-all duration-200'
            >
              Home
            </a>

            <button
              type='button'
              onClick={toggleServices}
              class='flex w-full items-center justify-between rounded-lg py-3 font-medium transition-all duration-200 hover:cursor-pointer'
            >
              Our Services
              <svg
                class={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            {isServicesOpen && (
              <ul class='mt-2 ml-4 space-y-1'>
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      class='text-muted block px-4 py-2 transition-colors duration-200'
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <a
              href='/about'
              class='block rounded-lg py-3 font-medium transition-all duration-200'
            >
              About Us
            </a>

            <a
              href='#contact'
              class='bg-primary hover:bg-primary-dark mt-4 block rounded-lg py-3 text-center font-bold text-white transition-all duration-300'
            >
              Contact
            </a>
          </nav>
        )}
      </div>

      {/* Desktop Navigation */}

      <nav class='font-barlow hidden items-center space-x-8 text-xl lg:flex'>
        <a
          href='/'
          class='hover:text-muted group relative py-1 font-medium text-white transition-colors duration-200'
        >
          HOME
          <span class='bg-accent absolute -bottom-1 left-0 h-[3px] w-0 transition-all duration-200 group-hover:w-full'></span>
        </a>

        {/* Desktop Services Dropdown */}

        <div
          class='group relative py-2'
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button
            type='button'
            ref={servicesRef}
            class={`hover:text-muted relative flex items-center py-1 font-medium transition-colors duration-200 ${isServicesOpen ? 'text-muted' : 'text-white'}`}
            aria-haspopup='true'
          >
            OUR SERVICES
            <svg
              class={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
            <span class='bg-accent absolute -bottom-1 left-0 h-[3px] w-0 transition-all duration-200 group-hover:w-full'></span>
          </button>

          {/* Desktop Dropdown Menu */}

          {isServicesOpen && (
            <ul class='bg-dark animate-fade-in absolute top-full left-0 w-56 rounded-lg border py-2 shadow-xl'>
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    class='hover:bg-light hover:text-primary block px-4 py-3 font-medium text-white transition-all duration-200 hover:cursor-pointer'
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href='/about'
          class='hover:text-muted group relative py-1 font-medium text-white transition-colors duration-200'
        >
          ABOUT US
          <span class='bg-accent absolute -bottom-1 left-0 h-[3px] w-0 transition-all duration-200 group-hover:w-full'></span>
        </a>

        <a
          href='#contact'
          class='hover:text-muted group relative py-1 font-medium text-white transition-colors duration-200'
        >
          CONTACT
          <span class='bg-accent absolute -bottom-1 left-0 h-[3px] w-0 transition-all duration-200 group-hover:w-full'></span>
        </a>
      </nav>
      </div>
    </header>
  )
}
