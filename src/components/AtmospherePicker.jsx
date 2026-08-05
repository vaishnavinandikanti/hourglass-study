import React from 'react'
import { ATMOSPHERES } from './Atmosphere.jsx'
import './AtmospherePicker.css'

export default function AtmospherePicker({ theme, onChange }) {
  return (
    <div className="atmo-picker" role="group" aria-label="Background atmosphere">
      {ATMOSPHERES.map((a) => (
        <button
          key={a.id}
          className={`atmo-picker__swatch atmo-picker__swatch--${a.id} ${
            a.id === theme ? 'atmo-picker__swatch--active' : ''
          }`}
          onClick={() => onChange(a.id)}
          aria-pressed={a.id === theme}
          title={a.label}
        >
          <span className="atmo-picker__label">{a.label}</span>
        </button>
      ))}
    </div>
  )
}
