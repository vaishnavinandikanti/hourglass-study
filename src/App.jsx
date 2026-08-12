
import React, { useState } from 'react'
import Atmosphere from './components/Atmosphere.jsx'
import Timer from './components/Timer.jsx'
import TechniqueSelector from './components/TechniqueSelector.jsx'
import SpotifyPanel from './components/SpotifyPanel.jsx'
import { AESTHETIC_THEMES, VIDEO_THEMES } from './themes.js'
import { TECHNIQUES } from './techniques.js'
import './App.css'

export default function App() {
  const [themeId, setThemeId] = useState('cafe')
  const [selectedVideo, setSelectedVideo] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [techniqueId, setTechniqueId] = useState('pomodoro')
  const [customWork, setCustomWork] = useState(30)
  const [customBreak, setCustomBreak] = useState(5)

  const technique = TECHNIQUES.find((t) => t.id === techniqueId)

  return (
    <div className="app">
      <Atmosphere
        themeId={themeId}
        onVideoChange={setSelectedVideo}
        selectedVideo={selectedVideo}
        isMuted={isMuted}
      />

      <header className="app__header">
        <span className="app__mark">⏳ Hourglass</span>
      </header>

      <main className="app__main">
        <Timer technique={technique} customWork={customWork} customBreak={customBreak} />
        <TechniqueSelector
          selectedId={techniqueId}
          onSelect={setTechniqueId}
          customWork={customWork}
          customBreak={customBreak}
          onCustomWorkChange={setCustomWork}
          onCustomBreakChange={setCustomBreak}
        />
      </main>

      {/* CONTROLS PANEL */}
      <div className="app__controls">
        {/* Aesthetic Themes */}
        <div className="app__aesthetic-picker">
          {AESTHETIC_THEMES.map((t) => (
            <button
              key={t.id}
              className={`app__aesthetic-btn app__aesthetic-btn--${t.id} ${t.id === themeId ? 'app__aesthetic-btn--active' : ''}`}
              onClick={() => setThemeId(t.id)}
              title={t.label}
            />
          ))}
        </div>

        {/* Video Themes */}
        <div className="app__video-theme-picker">
          {VIDEO_THEMES.map((t) => (
            <button
              key={t.id}
              className={`app__video-theme-btn ${t.id === themeId ? 'app__video-theme-btn--active' : ''}`}
              onClick={() => setThemeId(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Video Selector */}
        {VIDEO_THEMES.find((t) => t.id === themeId)?.videos && VIDEO_THEMES.find((t) => t.id === themeId).videos.length > 1 && (
          <div className="app__video-picker">
            {VIDEO_THEMES.find((t) => t.id === themeId).videos.map((v) => (
              <button
                key={v.id}
                className={`app__video-btn ${v.id === selectedVideo ? 'app__video-btn--active' : ''}`}
                onClick={() => setSelectedVideo(v.id)}
              >
                {v.id}
              </button>
            ))}
          </div>
        )}

        {/* Mute Button */}
        {VIDEO_THEMES.find((t) => t.id === themeId) && (
          <button
            className={`app__mute-btn ${isMuted ? 'app__mute-btn--muted' : ''}`}
            onClick={() => setIsMuted((m) => !m)}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}
      </div>

      <SpotifyPanel themeId={themeId} />
    </div>
  )
}
EOF

