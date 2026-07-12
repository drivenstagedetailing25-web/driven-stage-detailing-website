import { useState, useMemo, useEffect } from 'react'
import { useContactModal } from '@/store/modalStore'
import { toast } from '@pheralb/toast'
import { ServiceDropdown } from './ServiceDropdown'
import { DateTimePicker } from './DateTimePicker'
import { SERVICES } from '@/lib/services'
import { Spinner } from './ui/Spinner'

interface ContactFormProps {
  blurredBackground?: boolean
  preselectedSlugs?: string[]
}

export function ContactForm({
  blurredBackground,
  preselectedSlugs,
}: ContactFormProps) {
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

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPreferredDate(val)
    setDateError('')
    if (!val) return

    const sel = new Date(val + 'T00:00:00')
    const day = sel.getDay()
    if (day === 0) {
      setPreferredDate('')
      setDateError('Please select a day from Monday to Saturday.')
      return
    }

    if (sel < new Date(todayISO + 'T00:00:00')) {
      setPreferredDate('')
      setDateError('Please select a future date.')
      return
    }
  }

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const [serviceError, setServiceError] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dropdownResetKey, setDropdownResetKey] = useState(0)

  useEffect(() => {
    setSelectedServices(preselectedSlugs ?? [])
  }, [preselectedSlugs])

  function handleServiceToggle(slug: string) {
    setServiceError(false)
    const service = SERVICES.find((item) => item.slug === slug)

    setSelectedServices((prev) => {
      if (!service) {
        return prev.includes(slug)
          ? prev.filter((item) => item !== slug)
          : [...prev, slug]
      }

      if (service.group === 'addon') {
        return prev.includes(slug)
          ? prev.filter((item) => item !== slug)
          : [...prev, slug]
      }

      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug)
      }

      const packageGroups = [
        'detailing',
        'premium-coating',
        'premium-correction',
      ] as const
      return [
        ...prev.filter((item) => {
          const selectedService = SERVICES.find(
            (serviceItem) => serviceItem.slug === item,
          )
          return (
            !selectedService ||
            selectedService.group === 'addon' ||
            selectedService.group !== service.group
          )
        }),
        slug,
      ]
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedServices.length === 0) {
      setServiceError(true)
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
      setPreferredDate('')
      setPreferredTime('')
      setSelectedServices([])
      setTermsAccepted(false)
      setTermsError(false)
      setServiceError(false)
      setDateError('')
      setName('')
      setEmail('')
      setDropdownResetKey((prev) => prev + 1)

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
      className={`relative w-full space-y-4 rounded-xl border border-zinc-700 bg-black/20 p-6 text-sm shadow-xl ${blurredBackground ? 'backdrop-blur-sm' : ''}`}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <ServiceDropdown
        selectedServices={selectedServices}
        onToggle={handleServiceToggle}
        resetKey={dropdownResetKey}
      />

      {serviceError && selectedServices.length === 0 && (
        <p className='mt-1 text-xs font-medium text-amber-400'>
          Select at least one service
        </p>
      )}

      <DateTimePicker
        preferredDate={preferredDate}
        preferredTime={preferredTime}
        dateError={dateError}
        todayISO={todayISO}
        onDateChange={handleDateChange}
        onTimeChange={(e) => setPreferredTime(e.target.value)}
      />

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

      <label className='text-muted flex cursor-pointer items-start gap-2 text-xs'>
        <input
          type='checkbox'
          checked={termsAccepted}
          onChange={(e) => {
            setTermsAccepted(e.target.checked)
            if (e.target.checked) setTermsError(false)
          }}
          className='accent-primary mt-0.5 h-4 w-4 flex-shrink-0 rounded'
        />
        <span>
          I accept the{' '}
          <a
            href='/terms'
            target='_blank'
            className='hover:text-primary/80 text-[#5998ff] underline'
          >
            Terms & Conditions
          </a>
        </span>
      </label>
      {termsError && (
        <p className='-mt-2 text-xs font-medium text-red-400'>
          You must accept the Terms & Conditions
        </p>
      )}

      {name.trim() &&
        email.trim() &&
        selectedServices.length > 0 &&
        preferredDate &&
        preferredTime &&
        termsAccepted && (
          <p className='text-muted animate-fade-up animate-duration-500 text-center text-xs leading-relaxed'>
            Final pricing is confirmed after an on-site vehicle inspection. Any
            adjustments will be discussed and approved by you before work
            begins.
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
