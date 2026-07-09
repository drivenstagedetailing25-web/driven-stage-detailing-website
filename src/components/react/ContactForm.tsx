import { useState, useMemo, useRef, useEffect } from 'react'
import { useContactModal } from '@/store/modalStore'
import { toast } from '@pheralb/toast'
import { Spinner } from './ui/Spinner'
import { SERVICES } from '@/lib/services'

interface ContactFormProps {
  blurredBackground?: boolean
}

type ResponseSuccess = {
  id: string
  success: boolean
}

export function ContactForm({ blurredBackground }: ContactFormProps) {
  const closeContactModal = useContactModal((state) => state.closeContactModal)
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [dateError, setDateError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const todayISO = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d.toISOString().split('T')[0]
  }, [])

  const isToday = preferredDate === todayISO

  const timeOptions = useMemo(() => {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const base = [
      { value: '08:00', label: '8:00 AM', minutes: 8 * 60 },
      { value: '11:00', label: '11:00 AM', minutes: 11 * 60 },
      { value: '15:00', label: '3:00 PM', minutes: 15 * 60 },
    ]
    return base.map((o) => ({
      ...o,
      disabled: isToday && o.minutes <= currentMinutes + 5,
    }))
  }, [isToday, preferredDate])

  function handleDateChange(e: any) {
    const val = e.target.value
    setPreferredDate(val)
    setDateError('')
    if (!val) return

    const sel = new Date(val + 'T00:00:00')
    const day = sel.getDay()
    if (day === 0 || day === 6) {
      setPreferredDate('')
      setDateError('Please select a weekday (Mon to Fri).')
      return
    }

    if (sel < new Date(todayISO + 'T00:00:00')) {
      setPreferredDate('')
      setDateError('Please select a future date.')
      return
    }
  }

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [servicesOpen, setServicesOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleServiceToggle(slug: string) {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedServices.length === 0) {
      return
    }

    if (!preferredDate) {
      setDateError('Preferred date is required.')
      return
    }

    if (!preferredTime) {
      return
    }

    if (!termsAccepted) {
      setTermsError(true)
      return
    }

    const formData = new FormData(e.currentTarget)
    const dataToSend = {
      ...Object.fromEntries(formData.entries()),
      services: selectedServices
        .map((slug) => SERVICES.find((s) => s.slug === slug)?.name ?? slug)
        .join(', '),
    }
    delete dataToSend.service

    setLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      setLoading(true)

      if (!response.ok) {
        throw new Error(
          'There was an error sending your message. Please try again.',
        )
      }

      toast.success({
        text: 'Thank you! Your message has been sent.',
      })

      e.currentTarget.reset()

      closeContactModal()
    } catch (err) {
      console.error('Error submitting form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full space-y-4 rounded-xl border border-zinc-700 bg-black/30 p-6 text-sm shadow-xl ${blurredBackground ? 'backdrop-blur-sm' : ''}`}
    >
      <div className='mt-5'>
        <label htmlFor='name' className='text-light mb-1 block font-medium'>
          Full Name *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          className='bg-light border-muted focus:ring-primary text-foreground w-full rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none'
          placeholder='Enter your full name'
        />
      </div>

      <div>
        <label htmlFor='email' className='text-light mb-1 block font-medium'>
          Email Address *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          required
          className='bg-light border-muted focus:ring-primary text-foreground w-full rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none'
          placeholder='Enter your email'
        />
      </div>

      <div>
        <label htmlFor='phone' className='text-light mb-1 block font-medium'>
          Phone Number
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          className='bg-light border-muted focus:ring-primary text-foreground w-full rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none'
          placeholder='Enter your phone number'
        />
      </div>

      <div ref={dropdownRef} className='relative'>
        <label className='text-light mb-1 block font-medium'>
          Services Interested In *
        </label>
        <button
          type='button'
          onClick={() => setServicesOpen(!servicesOpen)}
          className={`bg-light border-muted text-foreground flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm text-left transition-all focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none ${
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
            fill='currentColor'
            className={`h-4 w-4 transition-transform duration-200 ${
              servicesOpen ? 'rotate-180' : ''
            }`}
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        {servicesOpen && (
          <div className='bg-light border-muted absolute z-30 mt-1 w-full rounded-lg border p-3 shadow-lg'>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {SERVICES.map((service) => (
                <label
                  key={service.slug}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
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
                    onChange={() => handleServiceToggle(service.slug)}
                    className='accent-primary h-4 w-4 rounded'
                  />
                  {service.name}
                </label>
              ))}
            </div>
          </div>
        )}
        {selectedServices.length === 0 && (
          <p className='mt-1 text-xs font-medium text-amber-400'>
            Select at least one service
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <label
            htmlFor='preferredDate'
            className='text-light mb-1 block font-medium'
          >
            Preferred Date *
          </label>
          <input
            type='date'
            id='preferredDate'
            name='preferredDate'
            required
            min={todayISO}
            value={preferredDate}
            onChange={handleDateChange}
            className={`bg-light border ${dateError ? 'border-red-500 focus:ring-red-500' : 'border-muted focus:ring-primary'} text-foreground w-full rounded-lg px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none`}
          />
          {dateError && (
            <p className='mt-1 text-xs font-medium text-red-400'>{dateError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='preferredTime'
            className='text-light mb-1 block font-medium'
          >
            Preferred Time *
          </label>
          <select
            id='preferredTime'
            name='preferredTime'
            required
            value={preferredTime}
            onChange={(e: any) => setPreferredTime(e.target.value)}
            className='bg-light border-muted focus:ring-primary text-foreground w-full rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none disabled:opacity-50'
            disabled={!preferredDate}
          >
            <option value=''>
              {preferredDate ? 'Select a time' : 'Select date first'}
            </option>
            {timeOptions.map((opt, idx) => (
              <option key={idx} value={opt.value} disabled={opt.disabled}>
                {opt.label}
                {opt.disabled ? ' (Unavailable)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor='message' className='text-light mb-1 block font-medium'>
          Additional Details
        </label>
        <textarea
          id='message'
          name='message'
          rows={2}
          className='bg-light border-muted focus:ring-primary text-foreground w-full resize-none rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none'
          placeholder='Tell us about your vehicle and service preferences...'
        ></textarea>
      </div>

      <label class='flex items-start gap-2 text-xs text-muted cursor-pointer'>
        <input
          type='checkbox'
          checked={termsAccepted}
          onChange={(e) => {
            setTermsAccepted(e.target.checked)
            if (e.target.checked) setTermsError(false)
          }}
          class='accent-primary mt-0.5 h-4 w-4 rounded flex-shrink-0'
        />
        <span>
          I accept the{' '}
          <a
            href='/terms'
            target='_blank'
            class='text-primary underline hover:text-primary/80'
          >
            Terms & Conditions
          </a>
        </span>
      </label>
      {termsError && (
        <p class='text-xs font-medium text-red-400 -mt-2'>
          You must accept the Terms & Conditions
        </p>
      )}

      <div className='pt-2 text-center'>
        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary w-full py-2.5'
        >
          {loading ? (
            <div className='fade-up flex items-center justify-center gap-1'>
              <Spinner />
              <span className='ml-2'>sending...</span>
            </div>
          ) : (
            <span className='fade-up'>{'Get My Free Quote'}</span>
          )}
        </button>
      </div>
    </form>
  )
}
