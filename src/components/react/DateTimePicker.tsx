import { useMemo } from 'react'

interface DateTimePickerProps {
  preferredDate: string
  preferredTime: string
  dateError: string
  todayISO: string
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function DateTimePicker({
  preferredDate,
  preferredTime,
  dateError,
  todayISO,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
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

  return (
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
          onChange={onDateChange}
          className={`bg-light border ${dateError ? 'border-red-500 focus:ring-red-500' : 'border-muted focus:ring-primary'} text-foreground w-full cursor-pointer rounded-lg px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none`}
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
          onChange={onTimeChange}
          className='modern-time-select bg-light border-muted focus:ring-primary text-foreground w-full cursor-pointer rounded-lg border px-3 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none disabled:opacity-50'
          disabled={!preferredDate}
        >
          <option value=''>{preferredDate ? 'Select a time' : 'Select date first'}</option>
          {timeOptions.map((opt, idx) => (
            <option key={idx} value={opt.value} disabled={opt.disabled}>
              {opt.label}
              {opt.disabled ? ' (Unavailable)' : ''}
            </option>
          ))}
        </select>

        <style>{`
          select.modern-time-select,
          select.modern-time-select::picker(select) {
            appearance: base-select;
          }
          select.modern-time-select::picker(select) {
            background: #ffffff;
            border: 1px solid #d4d4d8;
            border-radius: 0.5rem;
            padding: 0.25rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          select.modern-time-select option {
            padding: 0.375rem 0.5rem;
            border-radius: 0.25rem;
            color: #18181b;
          }
          select.modern-time-select option:hover {
            background: #f4f4f5;
          }
        `}</style>
      </div>
    </div>
  )
}
