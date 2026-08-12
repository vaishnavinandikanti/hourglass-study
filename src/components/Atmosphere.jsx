import React, { useState } from 'react'
import { THEMES, getYouTubeEmbedUrl } from "../themes.js"
import './Atmosphere.css'

export default function Atmosphere({ themeId, onThemeChange, onVideoChange, selectedVideo, isMuted, onMuteToggle }) {
  const theme = THEMES.find((t) => t.id === themeId)
  
  if (!theme) return null

  const currentVideo = theme.videos.find((v) => v.id === selectedVideo) || theme.videos[0]
  const embedUrl = getYouTubeEmbedUrl(currentVideo.url)

  return (
    <div className="atmosphere" aria-hidden="true">
      {/* YouTube Video Background */}
      <div className="atmosphere__video-container">
        <iframe
          key={currentVideo.url}
          className="atmosphere__video"
          src={embedUrl}
          title="Ambient video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="atmosphere__overlay" />
      </div>

      {/* Theme & Video Switcher */}
      <div className="atmosphere__controls">
        <div className="atmosphere__theme-picker">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`atmosphere__theme-btn ${t.id === themeId ? 'atmosphere__theme-btn--active' : ''}`}
              onClick={() => onThemeChange(t.id)}
              title={t.label}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Video Selector (if theme has multiple videos) */}
        {theme.videos.length > 1 && (
          <div className="atmosphere__video-picker">
            {theme.videos.map((v) => (
              <button
                key={v.id}
                className={`atmosphere__video-btn ${v.id === selectedVideo ? 'atmosphere__video-btn--active' : ''}`}
                onClick={() => onVideoChange(v.id)}
              >
                {v.id}
              </button>
            ))}
          </div>
        )}

        {/* Mute Button */}
        <button
          className={`atmosphere__mute-btn ${isMuted ? 'atmosphere__mute-btn--muted' : ''}`}
          onClick={onMuteToggle}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  )
}