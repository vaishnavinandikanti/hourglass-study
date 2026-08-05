import React, { useState } from 'react'
import Atmosphere from './components/Atmosphere.jsx'
import AtmospherePicker from './components/AtmospherePicker.jsx'
import Timer from './components/Timer.jsx'
import TechniqueSelector from './components/TechniqueSelector.jsx'
import SpotifyPanel from './components/SpotifyPanel.jsx'
import { TECHNIQUES } from './techniques.js'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState('ember')
  const [techniqueId, setTechniqueId] = useState('pomodoro')
  const [customWork, setCustomWork] = useState(30)
  const [customBreak, setCustomBreak] = useState(5)

  const technique = TECHNIQUES.find((t) => t.id === techniqueId)

  return (
    <div className="app">
      <Atmosphere theme={theme} />

      <header className="app__header">
        <span className="app__mark">⏳ Hourglass</span>
        <AtmospherePicker theme={theme} onChange={setTheme} />
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

      <SpotifyPanel />
    </div>
  )
}
