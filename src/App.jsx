import React, { useState } from 'react'
import Atmosphere from './components/Atmosphere.jsx'
import Timer from './components/Timer.jsx'
import TechniqueSelector from './components/TechniqueSelector.jsx'
import SpotifyPanel from './components/SpotifyPanel.jsx'
import { AESTHETIC_THEMES, VIDEO_THEMES } from './themes.js'
import { TECHNIQUES } from './techniques.js'
import './App.css'

export default function App() {
  const [themeId, setThemeId] = useState('ember')
  const [selectedVideo, setSelectedVideo] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [techniqueId, setTechniqueId] = useState('pomodoro')
  const [customWork, setCustomWork] = useState(30)
  const [customBreak, setCustomBreak] = useState(5)
  const [clickTest, setClickTest] = useState(false)

  const technique = TECHNIQUES.find((t) => t.id === techniqueId)

  return (
    <div className="app">
      <Atmosphere themeId={themeId} onVideoChange={setSelectedVideo} selectedVideo={selectedVideo} isMuted={isMuted} />

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

      <div className="app__controls">
        <button onClick={() => setClickTest(!clickTest)} style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#d8a657', color: 'black', border: 'none', borderRadius: '8px'}}>
          TEST CLICK: {clickTest ? 'WORKING ✓' : 'NOT WORKING'}
        </button>

        <select value={themeId} onChange={(e) => setThemeId(e.target.value)} style={{padding: '10px', fontSize: '14px'}}>
          {AESTHETIC_THEMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          {VIDEO_THEMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>

      <SpotifyPanel themeId={themeId} />
    </div>
  )
}
