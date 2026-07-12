import { useState, useRef, useEffect } from 'react'
import { SERVICES, SERVICE_GROUPS, type ServiceGroup } from '@/lib/services'

interface ServiceDropdownProps {
  selectedServices: string[]
  onToggle: (slug: string) => void
  resetKey?: number
}

export function ServiceDropdown({
  selectedServices,
  onToggle,
  resetKey,
}: ServiceDropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [resetKey])

  const groups: ServiceGroup[] = [
    'detailing',
    'premium-coating',
    'premium-correction',
    'addon',
  ]

  return (
    <div ref={dropdownRef} className='relative'>
      <label className='text-light mb-1 block font-medium'>
        Services Interested In *
      </label>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className={`bg-light border-muted text-foreground focus:ring-primary flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none ${
          selectedServices.length === 0 ? 'text-zinc-400' : ''
        }`}
      >
        <span>
          {selectedServices.length === 0
            ? 'Select services'
            : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            fillRule='evenodd'
            d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {open && (
        <div className='bg-light border-muted absolute z-30 mt-1 w-full overflow-hidden rounded-lg border shadow-lg animate-fade-up animate-duration-300'>
          <div className='max-h-[min(280px,calc(100dvh-14rem))] overflow-x-hidden overflow-y-auto overscroll-contain'>
            <div className='p-3 pr-2'>
              {groups.map((group) => {
                const items = SERVICES.filter((s) => s.group === group)
                if (items.length === 0) return null
                return (
                  <div key={group} className='mt-2 first:mt-0'>
                    <div className='mb-2'>
                      <span className='text-xs font-semibold tracking-wider text-zinc-600 uppercase'>
                        {SERVICE_GROUPS[group]}
                      </span>
                    </div>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                      {items.map((service) => (
                        <label
                          key={service.slug}
                          className={`flex min-w-0 cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-[12.5px] transition-all ${
                            selectedServices.includes(service.slug)
                              ? 'border-primary bg-primary/10 text-dark'
                              : 'border-muted text-foreground hover:border-zinc-400'
                          }`}
                        >
                          <input
                            type='checkbox'
                            name='services'
                            value={service.slug}
                            checked={selectedServices.includes(service.slug)}
                            onChange={() => onToggle(service.slug)}
                            className='accent-primary h-4 w-4 rounded'
                          />
                          <span className='min-w-0 leading-snug whitespace-normal'>
                            {service.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
