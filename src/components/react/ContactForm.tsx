import { useState, useMemo } from 'react'
import { useContactModal } from '../../store/modalStore'
import { toast } from '@pheralb/toast'
import { Spinner } from './ui/Spinner'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!preferredDate) {
      setDateError('Preferred date is required.')
      return
    }

    if (!preferredTime) {
      return
    }

    const formData = new FormData(e.currentTarget)
    const dataToSend = Object.fromEntries(formData.entries())

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

      <div>
        <label htmlFor='service' className='text-light mb-1 block font-medium'>
          Service Interested In *
        </label>
        <select
          id='service'
          name='service'
          required
          className='bg-light border-muted focus:ring-primary text-foreground w-full rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none'
        >
          <option value=''>Select a service</option>
          <option value='mobile-detailing'>Mobile Detailing</option>
          <option value='paint-correction'>Paint Correction</option>
          <option value='ceramic-coating'>Ceramic Coating</option>
          <option value='multiple'>Multiple Services</option>
        </select>
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
