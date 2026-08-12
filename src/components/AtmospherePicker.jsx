import React from 'react'
import { THEMES } from '../themes.js'
import './AtmospherePicker.css'

export default function AtmospherePicker({ themeId, onChange }) {
  return (
    <div className="atmo-picker" role="group" aria-label="Background themes">
      {THEMES.map((t) => (
        <button
          key={t.id}
          className={`atmo-picker__swatch atmo-picker__swatch--${t.id} ${
            t.id === themeId ? 'atmo-picker__swatch--active' : ''
          }`}
          onClick={() => onChange(t.id)}
          aria-pressed={t.id === themeId}
          title={t.label}
        >
          <span className="atmo-picker__label">{t.label}</span>
        </button>
      ))}
    </div>
  )
}