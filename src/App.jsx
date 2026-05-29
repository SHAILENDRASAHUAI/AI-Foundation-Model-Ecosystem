import { useState } from 'react'
import './App.css'

const nodes = [
  {
    id: 'openai',
    label: 'OpenAI',
    x: 18,
    y: 32,
    color: '#10a37f',
    detail: 'Frontier multimodal models and platform ecosystem.',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    x: 38,
    y: 18,
    color: '#c7a17a',
    detail: 'Constitutional AI focus with enterprise-safe assistants.',
  },
  {
    id: 'google-deepmind',
    label: 'Google DeepMind',
    x: 66,
    y: 20,
    color: '#5f8cff',
    detail: 'Research-led models spanning reasoning, multimodality, and agents.',
  },
  {
    id: 'meta',
    label: 'Meta',
    x: 82,
    y: 42,
    color: '#4da3ff',
    detail: 'Open-weight Llama family powering broad developer adoption.',
  },
  {
    id: 'xai',
    label: 'xAI',
    x: 66,
    y: 72,
    color: '#a7b4c3',
    detail: 'Rapidly iterating Grok models tightly integrated with product surfaces.',
  },
  {
    id: 'mistral',
    label: 'Mistral',
    x: 30,
    y: 74,
    color: '#f97316',
    detail: 'Efficient open and commercial models with strong deployment flexibility.',
  },
]

const links = [
  ['openai', 'anthropic'],
  ['openai', 'google-deepmind'],
  ['anthropic', 'google-deepmind'],
  ['google-deepmind', 'meta'],
  ['meta', 'xai'],
  ['xai', 'mistral'],
  ['mistral', 'openai'],
  ['anthropic', 'mistral'],
  ['google-deepmind', 'xai'],
]

const getNode = (id) => nodes.find((node) => node.id === id)

function App() {
  const [tooltip, setTooltip] = useState(null)

  const showTooltip = (node, x, y) => {
    setTooltip({
      node,
      x,
      y,
    })
  }

  return (
    <main className="ecosystem">
      <header className="hero">
        <p className="eyebrow">Interactive Infographic</p>
        <h1>AI Foundation Model Ecosystem</h1>
        <p className="subtitle">
          Explore the leading model labs and their connected frontier landscape.
        </p>
      </header>

      <section
        className="graph-panel"
        onMouseLeave={() => setTooltip(null)}
        aria-label="Network map of AI foundation model companies"
      >
        <svg viewBox="0 0 1000 620" role="img" aria-labelledby="graphTitle graphDesc">
          <title id="graphTitle">AI Foundation Model Ecosystem</title>
          <desc id="graphDesc">Interactive SVG network graph of six leading model organizations.</desc>

          <defs>
            <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.25" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {links.map(([from, to]) => {
            const fromNode = getNode(from)
            const toNode = getNode(to)
            return (
              <line
                key={`${from}-${to}`}
                className="graph-link"
                x1={fromNode.x * 10}
                y1={fromNode.y * 6.2}
                x2={toNode.x * 10}
                y2={toNode.y * 6.2}
              />
            )
          })}

          {nodes.map((node) => (
            <g
              key={node.id}
              className="graph-node"
              tabIndex={0}
              onMouseMove={(event) => showTooltip(node, event.clientX, event.clientY)}
              onMouseEnter={(event) => showTooltip(node, event.clientX, event.clientY)}
              onFocus={(event) => showTooltip(node, event.clientX, event.clientY)}
              onBlur={() => setTooltip(null)}
            >
              <circle
                cx={node.x * 10}
                cy={node.y * 6.2}
                r="28"
                fill={node.color}
                filter="url(#softGlow)"
              />
              <circle cx={node.x * 10} cy={node.y * 6.2} r="35" className="node-ring" />
              <text x={node.x * 10} y={node.y * 6.2 + 58} textAnchor="middle" className="node-label">
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {tooltip && (
          <div
            className="tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
            role="status"
          >
            <strong>{tooltip.node.label}</strong>
            <span>{tooltip.node.detail}</span>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
