import React, { useMemo } from 'react'
import './Atmosphere.css'

export const ATMOSPHERES = [
  { id: 'ember', label: 'Ember' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'tide', label: 'Tide' },
  { id: 'grove', label: 'Grove' },
  { id: 'midnight', label: 'Midnight' },
]

// Deterministic pseudo-random star positions so they don't reshuffle on re-render
function useStars(count) {
  return useMemo(() => {
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      delay: rand() * 6,
      size: rand() > 0.85 ? 2 : 1,
    }))
  }, [count])
}

export default function Atmosphere({ theme }) {
  const stars = useStars(theme === 'midnight' ? 80 : 0)

  return (
    <div className={`atmosphere atmosphere--${theme}`} aria-hidden="true">
      <div className="atmosphere__blob atmosphere__blob--a" />
      <div className="atmosphere__blob atmosphere__blob--b" />
      <div className="atmosphere__blob atmosphere__blob--c" />
      {theme === 'tide' && (
        <div className="atmosphere__waves">
          <span className="wave wave--1" />
          <span className="wave wave--2" />
          <span className="wave wave--3" />
        </div>
      )}
      {theme === 'midnight' &&
        stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  )
}
