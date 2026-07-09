import { useMemo } from 'react'

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number
  cols?: number
  cellSize?: number
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  )

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: 'auto',
  }

  return (
    <div
      className='absolute inset-0 h-full w-full'
      style={
        {
          '--cell-border-color': '#e9e9e9',
          '--cell-fill-color': '#fafafa',
        } as React.CSSProperties
      }
    >
      <div
        className='relative h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]'
        style={
          {
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          } as React.CSSProperties
        }
      >
        <div className='pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden' />
        <div className='relative z-[3]' style={gridStyle}>
          {cells.map((idx) => (
            <div
              key={idx}
              className='cell pointer-events-none relative border-[0.5px] opacity-40'
              style={{
                backgroundColor: 'var(--cell-fill-color)',
                borderColor: 'var(--cell-border-color)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
