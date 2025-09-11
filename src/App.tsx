import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TomAvatar } from './components/TomAvatar'
import { USMapIndicator } from './components/USMapIndicator'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

interface Scene {
  id: string
  title: string
  subtitle?: string
  content: React.JSX.Element
  background: string
  computer?: string
  phone?: string
  llm?: string
  personalStatus?: string
  location?: 'new-york' | 'berkeley' | 'amherst' | 'chicago' | 'sf-peninsula'
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [currentComputer, setCurrentComputer] = useState<string>('')
  const [currentPhone, setCurrentPhone] = useState<string>('')
  const [currentLLM, setCurrentLLM] = useState<string>('')
  const [currentPersonalStatus, setCurrentPersonalStatus] = useState<string>('')
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const scenesRef = useRef<HTMLDivElement[]>([])

  // Define which scenes have dark backgrounds (need white text)
  const darkBackgroundScenes = new Set(['intro', 'amherst', 'chicago', 'silicon-valley', 'amazon-key', 'future', 'credits'])

  const scenes: Scene[] = [
    {
      id: 'intro',
      title: 'Tom Harada',
      content: (
        <div className="scene-content intro">
          <div className="scroll-indicator" onClick={() => setCurrentScene(1)}>
            <div className="arrow-right">→</div>
            <p style={{ color: 'white', fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
              <span className="desktop-hint">Use arrow keys to navigate</span>
              <span className="mobile-hint">Swipe to navigate</span>
            </p>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #2a2a3e 0%, #1f1f2e 100%)'
    },
    {
      id: 'new-york',
      title: 'Born in New York',
      content: (
        <div className="scene-content new-york">
          <div className="ny-experience">
            <div className="pizza-rain-container">
              {[...Array(50)].map((_, i) => (
                <span key={i} className="diagonal-pizza" style={{ 
                  left: `${-10 + Math.random() * 120}%`,
                  top: `${-20 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}>🍕</span>
              ))}
            </div>
            <div className="ny-childhood">
              <span className="main-icon">🛝</span>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #f5f0e8 0%, #e8ddd0 100%)',
      personalStatus: 'Kid',
      location: 'new-york'
    },
    {
      id: 'berkeley-life',
      title: 'Grew Up in Berkeley',
      content: (
        <div className="scene-content berkeley">
          <div className="activities-grid three-card-grid">
            <div className="activity-card" data-activity="biking">
              <span className="icon">🚴</span>
              <h3>Biking</h3>
            </div>
            <div className="activity-card activity-card-tennis" data-activity="tennis">
              <span className="icon tennis-ball">🎾</span>
              <h3>Tennis</h3>
              <div className="skateboard-animation">
                <span className="skateboard">🛹</span>
              </div>
            </div>
            <div className="activity-card" data-activity="bmug">
              <span className="icon">💻</span>
              <h3>Berkeley Macintosh User's Group</h3>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #e8f5e8 0%, #d5f0d5 100%)',
      computer: 'Apple IIgs → Macintosh LC III → Gateway 2000',
      personalStatus: 'Kid',
      location: 'berkeley'
    },
    {
      id: 'amherst',
      title: 'Amherst College',
      content: (
        <div className="scene-content amherst">
          <div className="college-grid three-card-grid">
            <div className="study-card">
              <span className="icon">📝</span>
              <h3>Writing Essays</h3>
              <p>Crafting arguments and ideas</p>
            </div>
            <div className="study-card">
              <span className="icon">🏛️</span>
              <h3>Ancient Greek</h3>
              <p>Translating classical texts</p>
            </div>
            <div className="study-card">
              <span className="icon" style={{ color: '#2a2a3e' }}>∑</span>
              <h3>Mathematics</h3>
              <p>Exploring abstract concepts</p>
            </div>
          </div>
          <div className="amherst-animation-container">
            <span className="animated-text essay-text">Frost wrote: "No tears in the writer, no tears in the reader..."</span>
            <span className="animated-text greek-text">γνῶθι σεαυτόν — "know thyself"</span>
            <span className="animated-text math-text">ζ(s) = Σ<sub>n=1</sub><sup>∞</sup> n<sup>-s</sup></span>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #3a3a5a 0%, #4a3a5a 100%)',
      computer: 'Toshiba Laptop',
      phone: 'Nokia 6230',
      location: 'amherst'
    },
    {
      id: 'chicago',
      title: 'Chicago Trading Firms',
      content: (
        <div className="scene-content chicago">
          <div className="trading-showcase">
            <div className="code-window">
              <div className="code-header">C++ Low Latency Servers</div>
              <div className="code-content">
                <span className="code-line code-comment">// Microsecond precision trading</span>
                <span className="code-line code-class">class OrderBook : public FIXEngine {'{'}</span>
                <span className="code-line code-method">  void execute_order(Order& o);</span>
                <span className="code-line code-bracket">{'}'};</span>
              </div>
            </div>
            <div className="companies-flow">
              <div className="company-badge">Akamai Trading</div>
              <div className="flow-arrow">→</div>
              <div className="company-badge">Jump Trading</div>
              <div className="flow-arrow">→</div>
              <div className="company-badge">Allston Trading</div>
              <div className="flow-arrow">→</div>
              <div className="company-badge">Breakwater Trading</div>
            </div>
            <div className="skills-learned">
              <span className="skill-tag">Fixed Income</span>
              <span className="skill-tag">Trading Algorithms</span>
              <span className="skill-tag">Electronic Trading</span>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #2a3a4e 0%, #3a4a5e 100%)',
      computer: 'Linux Workstations',
      phone: 'BlackBerry',
      location: 'chicago'
    },
    {
      id: 'silicon-valley',
      title: 'Intuit/NCR: Mobile Banking',
      content: (
        <div className="scene-content silicon-valley">
          <div className="mobile-showcase">
            <div className="phone-container">
              <div className="phone-screen">
                <div className="app-icon">🏦</div>
                <p className="app-type">Banking Apps</p>
              </div>
            </div>
            <div className="tech-stack">
              <div className="tech-badge ios">iOS Development</div>
              <div className="tech-badge web">Mobile Web</div>
            </div>
            <div className="banks-grid-container">
              <div className="banks-grid">
                {[...Array(800)].map((_, i) => (
                  <div key={i} className="bank-item" style={{ animationDelay: `${i * 0.01}s` }}>
                    🏦
                  </div>
                ))}
              </div>
              <div className="banks-overlay">
                <h3>800+ Banks</h3>
                <p>Nationwide Financial Institutions</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #2a4a4a 0%, #3a5a5a 100%)',
      computer: 'MacBook Pro 15"',
      phone: 'iPhone 4 → iPhone 4S',
      personalStatus: 'Partner, Kid',
      location: 'sf-peninsula'
    },
    {
      id: 'amazon-key',
      title: 'Amazon Key',
      content: (
        <div className="scene-content amazon-key">
          <div className="amazon-combined">
            <div className="delivery-section">
              <div className="package-flow">
                <div className="package">📦</div>
                <div className="flow-line"></div>
                <div className="destination">🏠</div>
              </div>
              <p className="section-label">Secure Delivery & Access Solutions</p>
            </div>
            <div className="products-section">
              <div className="apps-grid-square">
                <div className="app-card key-card">
                  <span className="app-icon rotating-key">🔑</span>
                  <h3>Amazon Key</h3>
                  <p>Indoor delivery access</p>
                </div>
                <div className="app-card flex-card">
                  <span className="app-icon driving-truck">🚚</span>
                  <h3>Amazon Flex</h3>
                  <p>Driver delivery app</p>
                </div>
                <div className="app-card ring-card">
                  <span className="app-icon ringing-bell">🔔</span>
                  <h3>Ring</h3>
                  <p>Home security integration</p>
                </div>
                <div className="app-card shopping-card">
                  <span className="app-icon sliding-cart">🛒</span>
                  <h3>Amazon Shopping</h3>
                  <p>Core shopping experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #3a4a5a 0%, #4a5a6a 100%)',
      computer: 'MacBook Pro 14" (M1 → M2 → M4 Max)',
      phone: 'iPhone X → 16 Pro Max',
      llm: 'Anthropic Claude 4',
      personalStatus: 'Parent, Partner, Kid',
      location: 'sf-peninsula'
    },
    {
      id: 'future',
      title: 'The Future',
      content: (
        <div className="scene-content future">
          <div className="future-vision">
            <div className="future-elements three-card-grid">
              <div className="future-item">
                <span className="future-icon future-icon-1">🌟</span>
                <h3>Build Products</h3>
                <p>Create tools that matter</p>
              </div>
              <div className="future-item">
                <span className="future-icon future-icon-2">🤝</span>
                <h3>Mentor</h3>
                <p>Help others grow</p>
              </div>
              <div className="future-item">
                <span className="future-icon future-icon-3">🌍</span>
                <h3>Make Global Impact</h3>
                <p>Use technology for good</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #1f1f2e 0%, #2a2a3e 100%)',
      location: 'sf-peninsula'
    },
    {
      id: 'credits',
      title: 'Credits & Tools',
      content: (
        <div className="scene-content credits">
          <div className="credits-grid">
            <div className="credits-scroll-wrapper">
            <div className="credits-section">
              <h3>💻 Hardware</h3>
              <div className="credits-items">
                <div className="credit-item">
                  <span className="credit-icon">🖥️</span>
                  <div>
                    <strong>MacBook Pro M4 Max</strong>
                    <p>128GB RAM, 8TB Storage</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">⌨️</span>
                  <div>
                    <strong>Nulea Ergonomic + Magic Trackpad</strong>
                    <p>Numpad removed, trackpad velcro-attached</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🖼️</span>
                  <div>
                    <strong>LG UltraFine Display</strong>
                    <p>External Monitor</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎧</span>
                  <div>
                    <strong>Apple Wired Headphones</strong>
                    <p>Audio</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="credits-section">
              <h3>🛠️ Development</h3>
              <div className="credits-items">
                <div className="credit-item">
                  <span className="credit-icon">⌨️</span>
                  <div>
                    <strong>Vim + iTerm</strong>
                    <p>Code editing</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">⚛️</span>
                  <div>
                    <strong>React + TypeScript</strong>
                    <p>Frontend framework</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🐍</span>
                  <div>
                    <strong>Python</strong>
                    <p>Backend & scripting</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎭</span>
                  <div>
                    <strong>GSAP</strong>
                    <p>Animation library</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">⚡</span>
                  <div>
                    <strong>Anthropic Claude</strong>
                    <p>AI development partner</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="credits-section">
              <h3>🎨 Design & Media</h3>
              <div className="credits-items">
                <div className="credit-item">
                  <span className="credit-icon">🎯</span>
                  <div>
                    <strong>Figma</strong>
                    <p>UI/UX design</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎬</span>
                  <div>
                    <strong>After Effects</strong>
                    <p>Motion graphics</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🖼️</span>
                  <div>
                    <strong>Photoshop + Illustrator</strong>
                    <p>Image editing & vectors</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎲</span>
                  <div>
                    <strong>Blender</strong>
                    <p>3D modeling & animation</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">📓</span>
                  <div>
                    <strong>Paper & Pencil</strong>
                    <p>Sketching & ideation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="credits-section">
              <h3>📚 Learning</h3>
              <div className="credits-items">
                <div className="credit-item">
                  <span className="credit-icon">🎬</span>
                  <div>
                    <strong>School of Motion</strong>
                    <p>Motion design courses</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">💻</span>
                  <div>
                    <strong>Frontend Masters</strong>
                    <p>Advanced web development</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">📺</span>
                  <div>
                    <strong>YouTube</strong>
                    <p>Tutorials & inspiration</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🍪</span>
                  <div>
                    <strong>CG Cookie</strong>
                    <p>Blender tutorials</p>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎨</span>
                  <div>
                    <strong>LearnUI Design</strong>
                    <p>UI/UX fundamentals</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
      location: 'sf-peninsula'
    }
  ]

  // Touch handling state
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const isSwiping = useRef<boolean>(false)

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1)
      } else if (e.key === 'ArrowLeft' && currentScene > 0) {
        setCurrentScene(currentScene - 1)
      }
    }

    // Handle wheel events for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Accumulate small scroll amounts for trackpad users
      const scrollThreshold = 50
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      
      if (Math.abs(delta) > scrollThreshold) {
        if (delta > 0 && currentScene < scenes.length - 1) {
          setCurrentScene(currentScene + 1)
        } else if (delta < 0 && currentScene > 0) {
          setCurrentScene(currentScene - 1)
        }
      }
    }

    // Handle touch events for swipe navigation
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      isSwiping.current = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const diffX = touchStartX.current - currentX
      const diffY = touchStartY.current - currentY

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping.current) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY
      const swipeThreshold = 50

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0 && currentScene < scenes.length - 1) {
          // Swipe left - go to next scene
          setCurrentScene(currentScene + 1)
        } else if (diffX < 0 && currentScene > 0) {
          // Swipe right - go to previous scene
          setCurrentScene(currentScene - 1)
        }
      }

      isSwiping.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentScene])

  // Set device info and location when scene changes
  useEffect(() => {
    const scene = scenes[currentScene]
    setCurrentComputer(scene.computer || '')
    setCurrentPhone(scene.phone || '')
    setCurrentLLM(scene.llm || '')
    setCurrentPersonalStatus(scene.personalStatus || '')
    setCurrentLocation(scene.location || '')
    
    // Set body data attribute for CSS styling
    document.body.setAttribute('data-scene', scene.id)
    
    // Tennis ball animation for Berkeley scene
    if (scene.id === 'berkeley-life') {
      // Reset animation by removing and re-adding elements
      const tennisBall = document.querySelector('.tennis-ball')
      const skateboard = document.querySelector('.skateboard-animation')
      
      if (tennisBall) {
        tennisBall.classList.remove('hit')
      }
      
      if (skateboard) {
        const parent = skateboard.parentNode
        const newSkateboard = skateboard.cloneNode(true)
        parent?.replaceChild(newSkateboard, skateboard)
      }
      
      setTimeout(() => {
        const tennisBall = document.querySelector('.tennis-ball')
        if (tennisBall) {
          tennisBall.classList.add('hit')
        }
      }, 2565) // Trigger when skateboard tilts (1.5s delay + 1.065s for 71% of 1.5s)
    }
    
    // Reset credits animation when entering credits scene
    if (scene.id === 'credits') {
      setTimeout(() => {
        const creditsGrid = document.querySelector('.credits-grid') as HTMLElement
        
        if (creditsGrid && window.innerWidth <= 768) {
          // Reset scroll position
          creditsGrid.scrollTop = 0
          
          // Calculate scroll distance
          const scrollHeight = creditsGrid.scrollHeight
          const clientHeight = creditsGrid.clientHeight
          const maxScroll = scrollHeight - clientHeight
          
          if (maxScroll > 0) {
            const duration = 10000 // 10 seconds
            const startTime = Date.now()
            
            const animateScroll = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Ease-in-out animation (slow start, fast middle, slow end)
              const easeInOutProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2
              
              creditsGrid.scrollTop = maxScroll * easeInOutProgress
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
          }
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [currentScene])

  // Initialize scene positions
  useEffect(() => {
    scenes.forEach((_, index) => {
      const sceneEl = scenesRef.current[index]
      if (!sceneEl) return

      // Position all scenes in same place
      gsap.set(sceneEl, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: index === 0 ? 'flex' : 'none'
      })
    })
  }, [])

  // Switch scenes instantly
  useEffect(() => {
    // Show/hide scenes instantly
    scenes.forEach((_, index) => {
      const sceneEl = scenesRef.current[index]
      if (!sceneEl) return
      
      sceneEl.style.display = index === currentScene ? 'flex' : 'none'
    })
  }, [currentScene])

  return (
    <div ref={containerRef} className="app-container">
      {/* Fixed Tom Avatar - hide on intro */}
      {currentScene > 0 && (
        <div className="fixed-avatar">
          <TomAvatar currentScene={currentScene} />
        </div>
      )}

      {/* Fixed Device Timeline */}
      {(currentComputer || currentPhone || currentLLM) && (
        <div className="fixed-computer-timeline">
          <div className="computer-indicator">
            {currentComputer && (
              <div className="current-computer">
                <span className="computer-icon">💻</span>
                <span className="computer-name">{currentComputer}</span>
              </div>
            )}
            {currentPhone && (
              <div className="current-phone">
                <span className="phone-icon">📱</span>
                <span className="phone-name">{currentPhone}</span>
              </div>
            )}
            {currentLLM && (
              <div className="current-llm">
                <span className="llm-icon">⚡</span>
                <span className="llm-name">{currentLLM}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed US Map Indicator */}
      <USMapIndicator currentLocation={currentLocation} />

      {/* Fixed Personal Status */}
      {currentPersonalStatus && (
        <div className="fixed-personal-status">
          <div className="personal-status-indicator">
            <span className="status-icon">👤</span>
            <span className="status-text">{currentPersonalStatus}</span>
          </div>
        </div>
      )}


      {/* Main viewport with transitioning scenes */}
      <div className="viewport">
        {/* Background layers for smooth transition */}
        {scenes.map((scene, index) => (
          <div
            key={`bg-${scene.id}`}
            className="background-layer"
            style={{ 
              background: scene.background,
              opacity: index === currentScene ? 1 : 0
            }}
          />
        ))}
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            ref={el => { if (el) scenesRef.current[index] = el }}
            className="scene"
          >
            <div className="scene-wrapper">
              <h1 className="scene-title" style={
                darkBackgroundScenes.has(scene.id) 
                  ? { color: 'white', opacity: 1 } 
                  : undefined
              }>{scene.title}</h1>
              {scene.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
