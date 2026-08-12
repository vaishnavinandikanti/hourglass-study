import React, { useState } from 'react'
import { AESTHETIC_THEMES, VIDEO_THEMES, ALL_THEMES, getYouTubeEmbedUrl } from '../themes.js'
import './Atmosphere.css'

export default function Atmosphere({ themeId, onThemeChange, onVideoChange, selectedVideo, isMuted, onMuteToggle }) {
  const theme = ALL_THEMES.find((t) => t.id === themeId)
  
  if (!theme) return null

  const isVideoTheme = theme.type === 'video'
  const currentVideo = isVideoTheme ? (theme.videos.find((v) => v.id === selectedVideo) || theme.videos[0]) : null
  const embedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.url) : null

  return (
    <div className={`atmosphere atmosphere--${isVideoTheme ? 'video' : theme.id}`} aria-hidden="true">
      {/* YouTube Video Background (only for video themes) */}
      {isVideoTheme && embedUrl && (
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
      )}

      {/* Gradient Background (only for aesthetic themes) */}
      {!isVideoTheme && (
        <>
          <div className="atmosphere__blob atmosphere__blob--a" />
          <div className="atmosphere__blob atmosphere__blob--b" />
          <div className="atmosphere__blob atmosphere__blob--c" />
          <div className="atmosphere__grain" />
          <div className="atmosphere__vignette" />
        </>
      )}

      {/* Theme & Video Switcher */}
      <div className="atmosphere__controls">
        {/* Aesthetic Theme Picker */}
        <div className="atmosphere__aesthetic-picker">
          {AESTHETIC_THEMES.map((t) => (
            <button
              key={t.id}
              className={`atmosphere__aesthetic-btn atmosphere__aesthetic-btn--${t.id} ${t.id === themeId ? 'atmosphere__aesthetic-btn--active' : ''}`}
              onClick={() => onThemeChange(t.id)}
              title={t.label}
            />
          ))}
        </div>

        {/* Video Theme Picker */}
        <div className="atmosphere__video-theme-picker">
          {VIDEO_THEMES.map((t) => (
            <button
              key={t.id}
              className={`atmosphere__video-theme-btn ${t.id === themeId ? 'atmosphere__video-theme-btn--active' : ''}`}
              onClick={() => onThemeChange(t.id)}
              title={t.label}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Video Selector (if video theme with multiple videos) */}
        {isVideoTheme && theme.videos.length > 1 && (
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

        {/* Mute Button (only for video themes) */}
        {isVideoTheme && (
          <button
            className={`atmosphere__mute-btn ${isMuted ? 'atmosphere__mute-btn--muted' : ''}`}
            onClick={onMuteToggle}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}
      </div>
    </div>
  )
}
