import React, { useState } from 'react'
import './SpotifyPanel.css'

const PRESETS = [
  { label: 'Lo-Fi Beats', id: '37i9dQZF1DWWQRwui0ExPn', type: 'playlist' },
  { label: 'Deep Focus', id: '37i9dQZF1DWZeKCadgRdKQ', type: 'playlist' },
  { label: 'Peaceful Piano', id: '37i9dQZF1DX4sWSpwq3LiO', type: 'playlist' },
]

function parseSpotifyUrl(raw) {
  try {
    const url = new URL(raw.trim())
    if (!url.hostname.includes('spotify.com')) return null
    const parts = url.pathname.split('/').filter(Boolean) // [type, id] (ignore intl prefixes)
    const type = parts.find((p) => ['playlist', 'track', 'album', 'artist', 'show', 'episode'].includes(p))
    const idx = parts.indexOf(type)
    const id = parts[idx + 1]
    if (!type || !id) return null
    return { type, id }
  } catch {
    return null
  }
}

export default function SpotifyPanel() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState(PRESETS[0])
  const [customUrl, setCustomUrl] = useState('')
  const [error, setError] = useState('')

  const handlePreset = (preset) => {
    setActive(preset)
    setError('')
    setCustomUrl('')
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    const parsed = parseSpotifyUrl(customUrl)
    if (!parsed) {
      setError('Paste a link like open.spotify.com/playlist/...')
      return
    }
    setError('')
    setActive({ label: 'Your link', ...parsed })
  }

  return (
    <div className={`spotify-panel ${collapsed ? 'spotify-panel--collapsed' : ''}`}>
      <button className="spotify-panel__toggle" onClick={() => setCollapsed((c) => !c)}>
        <span className="spotify-panel__dot" />
        {collapsed ? 'Now playing' : 'Hide'}
      </button>

      {!collapsed && (
        <div className="spotify-panel__body">
          <div className="spotify-panel__presets">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                className={`spotify-panel__chip ${active.id === p.id ? 'spotify-panel__chip--active' : ''}`}
                onClick={() => handlePreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <iframe
            key={`${active.type}-${active.id}`}
            title="Spotify player"
            src={`https://open.spotify.com/embed/${active.type}/${active.id}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />

          <form className="spotify-panel__custom" onSubmit={handleCustomSubmit}>
            <input
              type="text"
              placeholder="Paste any Spotify playlist/track link"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button type="submit">Load</button>
          </form>
          {error && <p className="spotify-panel__error">{error}</p>}
        </div>
      )}
    </div>
  )
}
