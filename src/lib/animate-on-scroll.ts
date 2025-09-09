import { animate, utils, onScroll } from 'animejs'

export function setupAutoFadeIn() {
  const elements = utils.$('.animate-fade-in')
  elements.forEach((el) => {
    const delayClass = Array.from(el.classList).find((cls) =>
      cls.startsWith('animate-delay-'),
    )
    let delay = 0
    if (delayClass) {
      const match = delayClass.match(/animate-delay-(\d+)/)
      if (match) delay = parseInt(match[1], 10)
    }
    animate(el, {
      opacity: [0, 1],
      duration: 700,
      delay,
      easing: 'easeOutExpo',
      autoplay: onScroll({ target: el }),
    })
  })
}

function setupAutoFadeUp() {
  const elements = utils.$('.animate-fade-up')
  elements.forEach((el) => {
    const delayClass = Array.from(el.classList).find((cls) =>
      cls.startsWith('animate-delay-'),
    )
    let delay = 0
    if (delayClass) {
      const match = delayClass.match(/animate-delay-(\d+)/)
      if (match) delay = parseInt(match[1], 10)
    }
    animate(el, {
      opacity: [0, 1],
      translateY: [32, 0],
      duration: 700,
      delay,
      easing: 'easeOutExpo',
      autoplay: onScroll({ target: el }),
    })
  })
}

function setupAutoFadeDown() {
  const elements = utils.$('.animate-fade-down')
  elements.forEach((el) => {
    const delayClass = Array.from(el.classList).find((cls) =>
      cls.startsWith('animate-delay-'),
    )
    let delay = 0
    if (delayClass) {
      const match = delayClass.match(/animate-delay-(\d+)/)
      if (match) delay = parseInt(match[1], 10)
    }
    animate(el, {
      opacity: [0, 1],
      translateY: [-32, 0],
      duration: 700,
      delay,
      easing: 'easeOutExpo',
      autoplay: onScroll({ target: el }),
    })
  })
}

function setupAutoFadeLeft() {
  const elements = utils.$('.animate-fade-left')
  elements.forEach((el) => {
    const delayClass = Array.from(el.classList).find((cls) =>
      cls.startsWith('animate-delay-'),
    )
    let delay = 0
    if (delayClass) {
      const match = delayClass.match(/animate-delay-(\d+)/)
      if (match) delay = parseInt(match[1], 10)
    }
    animate(el, {
      opacity: [0, 1],
      translateX: [-32, 0],
      duration: 700,
      delay,
      easing: 'easeOutExpo',
      autoplay: onScroll({ target: el }),
    })
  })
}

function setupAutoFadeRight() {
  const elements = utils.$('.animate-fade-right')
  elements.forEach((el) => {
    const delayClass = Array.from(el.classList).find((cls) =>
      cls.startsWith('animate-delay-'),
    )
    let delay = 0
    if (delayClass) {
      const match = delayClass.match(/animate-delay-(\d+)/)
      if (match) delay = parseInt(match[1], 10)
    }
    animate(el, {
      opacity: [0, 1],
      translateX: [32, 0],
      duration: 700,
      delay,
      easing: 'easeOutExpo',
      autoplay: onScroll({ target: el }),
    })
  })
}

export function setupScrollAnimations() {
  setupAutoFadeUp()
  setupAutoFadeDown
  setupAutoFadeLeft()
  setupAutoFadeRight()
  setupAutoFadeIn()
}
