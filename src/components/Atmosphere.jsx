import React from 'react'
import { AESTHETIC_THEMES, VIDEO_THEMES, ALL_THEMES, getYouTubeEmbedUrl } from '../themes.js'
import './Atmosphere.css'

export default function Atmosphere({ themeId, onVideoChange, selectedVideo, isMuted }) {
  const theme = ALL_THEMES.find((t) => t.id === themeId)
  
  if (!theme) return null

  const isVideoTheme = theme.type === 'video'
  const currentVideo = isVideoTheme ? (theme.videos.find((v) => v.id === selectedVideo) || theme.videos[0]) : null
  const embedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.url, isMuted) : null

  return (
    <div className={`atmosphere atmosphere--${isVideoTheme ? 'video' : theme.id}`} aria-hidden="true">
      {/* YouTube Video Background (only for video themes) */}
      {isVideoTheme && embedUrl && (
        <div className="atmosphere__video-container">
          <iframe
            key={`${currentVideo.url}-${isMuted}`}
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
    </div>
  )
}
