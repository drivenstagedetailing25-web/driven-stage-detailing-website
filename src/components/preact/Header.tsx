import { useState, useEffect, useRef } from 'preact/hooks'

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const servicesRef = useRef<HTMLLIElement>(null)

  const services = [
    { name: 'Performance Tuning', href: '/services/performance-tuning' },
    { name: 'Premium Detailing', href: '/services/premium-detailing' },
    { name: 'Custom Modifications', href: '/services/custom-modifications' },
  ]

  const toggleServices = () => setIsServicesOpen(!isServicesOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Close dropdown when clicking outside (not needed for hover, but keeping for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        // Only close if it's mobile menu open
        if (isMobileMenuOpen) {
          setIsServicesOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header class='absolute top-0 right-0 left-0 z-50 bg-transparent'>
      <nav
        class='container mx-auto px-6 py-4'
        role='navigation'
        aria-label='Main navigation'
      >
        {/* Logo and Brand */}
        <section class='flex items-center justify-between'>
          <a
            href='/'
            class='group flex items-center space-x-3'
            aria-label='Driven Stage Detailing - Home'
          >
            <img
              src='/images/logo.png'
              alt='Driven Stage Detailing Logo'
              class='group-hover:shadow-glow h-24 md:h-32 w-auto rounded-lg shadow-sm brightness-110 contrast-110 transition-all duration-300'
            />
            <div class='hidden sm:block'>
              <h1 class='text-xl font-bold text-white transition-colors duration-300'>
                DRIVEN STAGE
              </h1>
              <p class='text-white text-sm font-medium transition-colors duration-300'>
                DETAILING
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul class='hidden items-center space-x-8 lg:flex font-barlow text-xl' role='menubar'>
            <li role='none'>
              <a
                href='/'
                class='hover:text-secondary group relative font-medium text-white transition-colors duration-200'
                role='menuitem'
              >
                HOME
                <span class='bg-secondary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-200 group-hover:w-full'></span>
              </a>
            </li>

            {/* Services Dropdown */}
            <li
              class='relative'
              role='none'
              ref={servicesRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type='button'
                class='hover:text-secondary group flex items-center font-medium text-white transition-colors duration-200'
                aria-haspopup='true'
                role='menuitem'
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
                <span class='bg-secondary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-200 group-hover:w-full'></span>
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <ul
                  class='bg-background border-neutral-light animate-fade-in absolute top-full left-0 mt-2 w-56 rounded-lg border py-2 shadow-xl'
                  role='menu'
                  aria-label='Services submenu'
                >
                  {services.map((service, index) => (
                    <li key={index} role='none'>
                      <a
                        href={service.href}
                        class='text-white hover:bg-neutral-light hover:text-secondary block px-4 py-3 font-medium transition-all duration-200'
                        role='menuitem'
                      >
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li role='none'>
              <a
                href='/about'
                class='hover:text-secondary group relative font-medium text-white transition-colors duration-200'
                role='menuitem'
              >
                ABOUT US
                <span class='bg-secondary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-200 group-hover:w-full'></span>
              </a>
            </li>

            <li role='none'>
              <a
                href='/contact'
                class='bg-secondary hover:bg-secondary/90 shadow-glow hover:shadow-glow-accent rounded-lg px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105'
                role='menuitem'
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            type='button'
            onClick={toggleMobileMenu}
            class='rounded-lg p-2 transition-colors duration-200 hover:bg-white/10 lg:hidden'
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
        </section>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <section class='bg-background border-neutral-light animate-slide-up mt-4 border-t pb-4 lg:hidden'>
            <ul
              class='mt-4 flex flex-col space-y-2'
              role='menu'
              aria-label='Mobile navigation'
            >
              <li role='none'>
                <a
                  href='/'
                  class='text-primary hover:bg-neutral-light hover:text-secondary block rounded-lg px-4 py-3 font-medium transition-all duration-200'
                  role='menuitem'
                >
                  Home
                </a>
              </li>

              {/* Mobile Services */}
              <li role='none'>
                <button
                  type='button'
                  onClick={toggleServices}
                  class='text-primary hover:bg-neutral-light hover:text-secondary flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium transition-all duration-200'
                  role='menuitem'
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
                  <ul
                    class='mt-2 ml-4 space-y-1'
                    role='menu'
                    aria-label='Mobile services submenu'
                  >
                    {services.map((service, index) => (
                      <li key={index} role='none'>
                        <a
                          href={service.href}
                          class='text-muted hover:text-secondary block px-4 py-2 transition-colors duration-200'
                          role='menuitem'
                        >
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li role='none'>
                <a
                  href='/about'
                  class='text-primary hover:bg-neutral-light hover:text-secondary block rounded-lg px-4 py-3 font-medium transition-all duration-200'
                  role='menuitem'
                >
                  About Us
                </a>
              </li>

              <li role='none'>
                <a
                  href='/contact'
                  class='bg-secondary hover:bg-secondary/90 shadow-glow mt-4 block rounded-lg px-4 py-3 text-center font-bold text-white transition-all duration-300'
                  role='menuitem'
                >
                  Contact
                </a>
              </li>
            </ul>
          </section>
        )}
      </nav>
    </header>
  )
}
