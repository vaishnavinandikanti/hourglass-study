import React from 'react'
import { TECHNIQUES } from '../techniques.js'
import './TechniqueSelector.css'

export default function TechniqueSelector({
  selectedId,
  onSelect,
  customWork,
  customBreak,
  onCustomWorkChange,
  onCustomBreakChange,
}) {
  const selected = TECHNIQUES.find((t) => t.id === selectedId)

  return (
    <div className="technique">
      <div className="technique__tabs" role="tablist" aria-label="Study technique">
        {TECHNIQUES.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === selectedId}
            className={`technique__tab ${t.id === selectedId ? 'technique__tab--active' : ''}`}
            onClick={() => onSelect(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {selected.id === 'custom' ? (
        <div className="technique__custom">
          <label>
            Focus
            <input
              type="number"
              min={1}
              max={180}
              value={customWork}
              onChange={(e) => onCustomWorkChange(Number(e.target.value) || 1)}
            />
            min
          </label>
          <label>
            Break
            <input
              type="number"
              min={1}
              max={60}
              value={customBreak}
              onChange={(e) => onCustomBreakChange(Number(e.target.value) || 1)}
            />
            min
          </label>
        </div>
      ) : (
        <p className="technique__note">{selected.note}</p>
      )}
    </div>
  )
}
