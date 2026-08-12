import React, { useState, useMemo } from 'react'
import { ALL_THEMES } from '../themes.js'
import './SpotifyPanel.css'

function parseSpotifyUrl(raw) {
  try {
    const url = new URL(raw.trim())
    if (!url.hostname.includes('spotify.com')) return null
    const parts = url.pathname.split('/').filter(Boolean)
    const type = parts.find((p) => ['playlist', 'track', 'album', 'artist', 'show', 'episode'].includes(p))
    const idx = parts.indexOf(type)
    const id = parts[idx + 1]
    if (!type || !id) return null
    return { type, id }
  } catch {
    return null
  }
}

export default function SpotifyPanel({ themeId }) {
  const [collapsed, setCollapsed] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [error, setError] = useState('')

  const currentTheme = useMemo(() => ALL_THEMES.find((t) => t.id === themeId), [themeId])
  const playlistId = useMemo(() => currentTheme?.spotifyPlaylistId, [currentTheme])

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    const parsed = parseSpotifyUrl(customUrl)
    if (!parsed) {
      setError('Paste a link like open.spotify.com/playlist/...')
      return
    }
    setError('')
    setCustomUrl('')
  }

  if (!playlistId) return null

  return (
    <div className={`spotify-panel ${collapsed ? 'spotify-panel--collapsed' : ''}`}>
      <button className="spotify-panel__toggle" onClick={() => setCollapsed((c) => !c)}>
        <span className="spotify-panel__dot" />
        {collapsed ? `♫ ${currentTheme?.label || 'Music'}` : 'Hide'}
      </button>

      {!collapsed && (
        <div className="spotify-panel__body">
          <p className="spotify-panel__theme-label">🎵 {currentTheme?.label} Playlist</p>

          <iframe
            key={playlistId}
            title={`${currentTheme?.label} Spotify Playlist`}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />

          <form className="spotify-panel__custom" onSubmit={handleCustomSubmit}>
            <input
              type="text"
              placeholder="Or paste any Spotify link"
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
