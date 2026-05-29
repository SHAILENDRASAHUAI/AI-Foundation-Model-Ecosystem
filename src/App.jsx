import { useMemo, useState } from 'react'
import './App.css'

const nodes = [
  {
    id: 'openai',
    label: 'OpenAI',
    x: 18,
    y: 32,
    color: '#10a37f',
    detail: 'Frontier multimodal models and platform ecosystem.',
    focus: 'Product velocity',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    x: 38,
    y: 18,
    color: '#c7a17a',
    detail: 'Constitutional AI focus with enterprise-safe assistants.',
    focus: 'Safety alignment',
  },
  {
    id: 'google-deepmind',
    label: 'Google DeepMind',
    x: 66,
    y: 20,
    color: '#5f8cff',
    detail: 'Research-led models spanning reasoning, multimodality, and agents.',
    focus: 'Research depth',
  },
  {
    id: 'meta',
    label: 'Meta',
    x: 82,
    y: 42,
    color: '#4da3ff',
    detail: 'Open-weight Llama family powering broad developer adoption.',
    focus: 'Open ecosystem',
  },
  {
    id: 'xai',
    label: 'xAI',
    x: 66,
    y: 72,
    color: '#a7b4c3',
    detail: 'Rapidly iterating Grok models tightly integrated with product surfaces.',
    focus: 'Fast iteration',
  },
  {
    id: 'mistral',
    label: 'Mistral',
    x: 30,
    y: 74,
    color: '#f97316',
    detail: 'Efficient open and commercial models with strong deployment flexibility.',
    focus: 'Deployment efficiency',
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

const highlights = [
  'Model race intensity',
  'Agent tooling growth',
  'Compute and inference scale',
  'Open-weight adoption',
  'Multimodal product expansion',
]

const getNode = (id) => nodes.find((node) => node.id === id)

function App() {
  const [tooltip, setTooltip] = useState(null)
  const [activeNodeId, setActiveNodeId] = useState(nodes[0].id)
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const activeNode = getNode(activeNodeId)

  const stats = useMemo(
    () => [
      { label: 'Leading labs', value: nodes.length },
      { label: 'Strategic links', value: links.length },
      { label: 'Landscape pulse', value: 'Live' },
    ],
    [],
  )

  const showTooltip = (node, x, y) => {
    setActiveNodeId(node.id)
    setTooltip({
      node,
      x,
      y,
    })
  }

  const moveGlow = (event) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setGlow({ x, y })
  }

  return (
    <main className="ecosystem">
      <header className="hero">
        <p className="eyebrow">Immersive Experience</p>
        <h1>AI Foundation Model Universe</h1>
        <p className="subtitle">
          A cinematic control room for exploring who is shaping the frontier of intelligence.
        </p>
        <div className="hero-actions" aria-label="Top summary controls">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-pill">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </header>

      <section className="experience-grid">
        <article
          className="graph-panel"
          onMouseLeave={() => setTooltip(null)}
          onMouseMove={moveGlow}
          aria-label="Network map of AI foundation model companies"
        >
          <div className="panel-glow" style={{ left: `${glow.x}%`, top: `${glow.y}%` }} />
          <svg viewBox="0 0 1000 620" role="img" aria-labelledby="graphTitle graphDesc">
            <title id="graphTitle">AI Foundation Model Ecosystem</title>
            <desc id="graphDesc">Interactive SVG network graph of six leading model organizations.</desc>

            <defs>
              <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="500" cy="310" r="246" className="orbit" />
            <circle cx="500" cy="310" r="172" className="orbit orbit-mid" />

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
                className={`graph-node ${activeNodeId === node.id ? 'active' : ''}`}
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
        </article>

        <aside className="insight-panel" aria-live="polite">
          <p className="panel-label">Current Spotlight</p>
          <h2>{activeNode.label}</h2>
          <p>{activeNode.detail}</p>
          <dl>
            <div>
              <dt>Core advantage</dt>
              <dd>{activeNode.focus}</dd>
            </div>
            <div>
              <dt>Connected peers</dt>
              <dd>{links.filter(([from, to]) => from === activeNode.id || to === activeNode.id).length}</dd>
            </div>
          </dl>
          <ul className="trend-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="pulse-rail" aria-label="Ecosystem pulse themes">
        {highlights.map((item) => (
          <article key={item} className="pulse-card">
            <span>Pulse</span>
            <strong>{item}</strong>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
