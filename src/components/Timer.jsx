import React, { useEffect, useRef, useState, useCallback } from 'react'
import './Timer.css'

const RADIUS = 130
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Timer({ technique, customWork, customBreak }) {
  const work = technique.id === 'custom' ? customWork : technique.work
  const shortBreak = technique.id === 'custom' ? customBreak : technique.short
  const longBreak = technique.long

  const [mode, setMode] = useState('work') // 'work' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(work * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [round, setRound] = useState(1)
  const [sessionsDone, setSessionsDone] = useState(0)

  const audioCtxRef = useRef(null)

  // Reset the clock whenever the technique or its custom lengths change
  useEffect(() => {
    setMode('work')
    setSecondsLeft(work * 60)
    setIsRunning(false)
    setRound(1)
  }, [technique.id, work, shortBreak])

  const playChime = useCallback(() => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx()
      const ctx = audioCtxRef.current
      const now = ctx.currentTime
      ;[523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.15, now + 0.05 + i * 0.15)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + i * 0.15)
        osc.connect(gain).connect(ctx.destination)
        osc.start(now + i * 0.15)
        osc.stop(now + 1.3 + i * 0.15)
      })
    } catch (e) {
      /* audio not available — silently skip */
    }
  }, [])

  const switchMode = useCallback(() => {
    playChime()
    if (mode === 'work') {
      const nextIsLong = round % technique.sessionsBeforeLong === 0
      setMode('break')
      setSecondsLeft((nextIsLong ? longBreak : shortBreak) * 60)
      setSessionsDone((n) => n + 1)
    } else {
      setMode('work')
      setSecondsLeft(work * 60)
      setRound((r) => r + 1)
    }
  }, [mode, round, technique.sessionsBeforeLong, longBreak, shortBreak, work, playChime])

  useEffect(() => {
    if (!isRunning) return
    if (secondsLeft <= 0) {
      switchMode()
      return
    }
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [isRunning, secondsLeft, switchMode])

  const totalForMode = mode === 'work' ? work * 60 : (round % technique.sessionsBeforeLong === 0 ? longBreak : shortBreak) * 60
  const progress = 1 - secondsLeft / totalForMode
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const reset = () => {
    setIsRunning(false)
    setMode('work')
    setSecondsLeft(work * 60)
    setRound(1)
  }

  const skip = () => switchMode()

  return (
    <div className="timer">
      <div className="timer__eyebrow">
        {mode === 'work' ? 'Focus round' : 'Break'} · {round}
        {technique.sessionsBeforeLong < 99 && ` of ${technique.sessionsBeforeLong}`}
      </div>

      <div className={`ring ring--${mode} ${isRunning ? 'ring--breathing' : ''}`}>
        <svg viewBox="0 0 280 280" className="ring__svg">
          <circle cx="140" cy="140" r={RADIUS} className="ring__track" />
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            className="ring__progress"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="ring__center">
          <span className="ring__time">{formatTime(secondsLeft)}</span>
          <span className="ring__mode-label">{mode === 'work' ? 'stay with it' : 'rest a moment'}</span>
        </div>
      </div>

      <div className="timer__controls">
        <button className="btn btn--ghost" onClick={reset} aria-label="Reset timer">
          Reset
        </button>
        <button className="btn btn--primary" onClick={() => setIsRunning((r) => !r)}>
          {isRunning ? 'Pause' : secondsLeft === work * 60 && mode === 'work' && round === 1 ? 'Begin' : 'Resume'}
        </button>
        <button className="btn btn--ghost" onClick={skip} aria-label="Skip to next">
          Skip
        </button>
      </div>

      <div className="timer__meta">
        <span>{sessionsDone} session{sessionsDone === 1 ? '' : 's'} completed today</span>
      </div>
    </div>
  )
}
