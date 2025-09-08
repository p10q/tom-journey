import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TomAvatar } from './components/TomAvatar'
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
  year?: string
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [currentComputer, setCurrentComputer] = useState<string>('')
  const [currentPhone, setCurrentPhone] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<string>('')
  const scenesRef = useRef<HTMLDivElement[]>([])

  const scenes: Scene[] = [
    {
      id: 'intro',
      title: 'Tom Harada',
      content: (
        <div className="scene-content intro">
          <div className="scroll-indicator" onClick={() => setCurrentScene(1)}>
            <div className="arrow-right">→</div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)'
    },
    {
      id: 'new-york',
      title: 'Born in New York',
      content: (
        <div className="scene-content new-york">
          <p className="narrative">The story begins in the city that never sleeps...</p>
          <div className="pizza-love">
            <span className="emoji pizza">🍕</span>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #FFE5B4 0%, #FFCC99 100%)',
      year: '1980s'
    },
    {
      id: 'moving',
      title: 'Age 5: Moving West',
      content: (
        <div className="scene-content moving">
          <p className="narrative">From coast to coast, a new chapter begins in Berkeley, California</p>
          <div className="moving-animation">
            <div className="us-map-container">
              <svg viewBox="0 0 800 400" className="us-outline">
                {/* Simplified US outline */}
                <path d="M 50 200 L 50 150 L 100 120 L 150 110 L 200 100 L 250 95 L 300 90 L 350 85 L 400 80 L 450 75 L 500 70 L 550 75 L 600 80 L 650 85 L 700 90 L 750 100 L 750 150 L 700 180 L 650 200 L 600 220 L 550 230 L 500 235 L 450 240 L 400 245 L 350 250 L 300 255 L 250 260 L 200 265 L 150 270 L 100 275 L 50 280 Z" 
                      fill="none" 
                      stroke="#1a1a2e" 
                      strokeWidth="2"
                      opacity="0.3"
                />
                {/* Florida */}
                <path d="M 650 230 L 680 250 L 690 280 L 670 290 L 650 270 Z" 
                      fill="none" 
                      stroke="#1a1a2e" 
                      strokeWidth="2"
                      opacity="0.3"
                />
                {/* California coast */}
                <path d="M 50 150 L 30 180 L 25 220 L 30 250 L 50 280" 
                      fill="none" 
                      stroke="#1a1a2e" 
                      strokeWidth="2"
                      opacity="0.3"
                />
                {/* Travel path */}
                <path className="travel-path" d="M 680 180 L 80 240" 
                      fill="none" 
                      stroke="#1a1a2e" 
                      strokeWidth="3"
                      strokeDasharray="10 5"
                />
              </svg>
              <div className="location-marker nyc">
                <span className="marker-dot"></span>
                <span className="marker-label">New York</span>
              </div>
              <div className="location-marker berkeley">
                <span className="marker-dot"></span>
                <span className="marker-label">Berkeley</span>
              </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #B4E5FF 0%, #99CCFF 100%)'
    },
    {
      id: 'montessori',
      title: 'Berkeley Montessori',
      content: (
        <div className="scene-content montessori">
          <p className="narrative">Learning and growing in a nurturing environment</p>
          <div className="school-memories">
            <div className="memory-item">📚 Hands-on learning</div>
            <div className="memory-item">🎨 Creative exploration</div>
            <div className="memory-item">👫 Making friends</div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #FFB4B4 0%, #FF99CC 100%)'
    },
    {
      id: 'berkeley-life',
      title: 'Growing Up in Berkeley',
      content: (
        <div className="scene-content berkeley">
          <div className="activities-grid">
            <div className="activity-card" data-activity="biking">
              <span className="icon">🚴</span>
              <h3>Biking</h3>
              <p>Exploring the hills and neighborhoods</p>
            </div>
            <div className="activity-card" data-activity="tennis">
              <span className="icon">🎾</span>
              <h3>Tennis</h3>
              <p>Serving up good times on the court</p>
            </div>
            <div className="activity-card" data-activity="bmug">
              <span className="icon">💻</span>
              <h3>Berkeley Mac User's Group</h3>
              <p>Where the tech journey began</p>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #B4FFB4 0%, #99FF99 100%)',
      computer: 'Apple IIgs',
      year: 'Late 1980s'
    },
    {
      id: 'amherst',
      title: 'Amherst College',
      content: (
        <div className="scene-content amherst">
          <div className="college-grid">
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
              <span className="icon">🧮</span>
              <h3>Mathematics</h3>
              <p>Exploring abstract concepts</p>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
      computer: 'Toshiba Laptop → MacBook Pro',
      phone: 'Nokia 6230 → Motorola RAZR',
      year: 'College Years (2001-2005)'
    },
    {
      id: 'chicago',
      title: 'Chicago Trading Years',
      content: (
        <div className="scene-content chicago">
          <div className="trading-showcase">
            <div className="code-window">
              <div className="code-header">C++ Low Latency Servers</div>
              <div className="code-content">
                <span className="code-line">// Microsecond precision trading</span>
                <span className="code-line">class OrderBook : public FIXEngine {'{'}</span>
                <span className="code-line">  void execute_order(Order& o);</span>
                <span className="code-line">{'}'};</span>
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
      background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
      computer: 'Linux Workstations + MacBook Pro',
      phone: 'BlackBerry Curve → iPhone 3G',
      year: 'Trading Firm Era (2006-2009)'
    },
    {
      id: 'silicon-valley',
      title: 'Mobile Banking',
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
            <div className="client-logos">
              <div className="logo-placeholder">Bank 1</div>
              <div className="logo-placeholder">Bank 2</div>
              <div className="logo-placeholder">Bank 3</div>
              <div className="logo-placeholder">Bank 4</div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #00695C 0%, #00897B 100%)',
      computer: 'MacBook Pro 15"',
      phone: 'iPhone 4 → iPhone 4S',
      year: '2010-2012 - Startup Era'
    },
    {
      id: 'amazon-key',
      title: 'Amazon Key: Secure Delivery',
      content: (
        <div className="scene-content amazon-key">
          <div className="delivery-and-apps">
            <div className="delivery-visual">
              <div className="package-flow">
                <div className="package">📦</div>
                <div className="flow-line"></div>
                <div className="destination">🏠</div>
              </div>
              <p className="delivery-text">Secure package delivery solutions</p>
            </div>
            <div className="apps-grid compact">
              <div className="app-card">
                <span className="app-icon">🔑</span>
                <h3>Amazon Key</h3>
                <p>Indoor delivery access</p>
              </div>
              <div className="app-card">
                <span className="app-icon">🚚</span>
                <h3>Amazon Flex</h3>
                <p>Driver delivery app</p>
              </div>
              <div className="app-card">
                <span className="app-icon">🔔</span>
                <h3>Ring</h3>
                <p>Home security integration</p>
              </div>
              <div className="app-card">
                <span className="app-icon">🛒</span>
                <h3>Amazon Shopping</h3>
                <p>Core shopping experience</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #E65100 0%, #F57C00 100%)',
      computer: 'MacBook Pro 16" (M1 → M2)',
      phone: 'iPhone X → 11 Pro → 12 Pro → 13 Pro',
      year: 'Amazon Era (2013-2023)'
    },
    {
      id: 'intercom-plus',
      title: 'Intercom Plus',
      content: (
        <div className="scene-content intercom-plus">
          <div className="ai-development">
            <div className="code-collaboration">
              <div className="ai-assistant">
                <span className="ai-icon">🤖</span>
                <p>AI Pair Programming</p>
              </div>
              <div className="flow-connector">⚡</div>
              <div className="development-speed">
                <span className="speed-icon">🚀</span>
                <p>10x Development Speed</p>
              </div>
            </div>
            <div className="tech-stack-grid">
              <div className="tech-item">
                <span className="icon">💻</span>
                <h4>Claude Code</h4>
                <p>AI-powered development</p>
              </div>
              <div className="tech-item">
                <span className="icon">🤖</span>
                <h4>Android / Jetpack Compose</h4>
                <p>Modern mobile development</p>
              </div>
            </div>
            <p className="project-description">Revolutionizing building access through AI-accelerated development</p>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #FF6F00 0%, #FF8F00 100%)',
      computer: 'MacBook Pro M4 Max',
      phone: 'iPhone 15 Pro',
      year: '2024-2025'
    },
    {
      id: 'future',
      title: 'The Future',
      content: (
        <div className="scene-content future">
          <div className="future-vision">
            <div className="future-elements">
              <div className="future-item">
                <span className="future-icon">🌟</span>
                <h3>Building Products</h3>
                <p>Creating tools that matter</p>
              </div>
              <div className="future-item">
                <span className="future-icon">🤝</span>
                <h3>Mentoring</h3>
                <p>Helping others grow</p>
              </div>
              <div className="future-item">
                <span className="future-icon">🌍</span>
                <h3>Global Impact</h3>
                <p>Technology for good</p>
              </div>
            </div>
            <div className="future-quote">
              <p>"The best way to predict the future is to invent it"</p>
              <span className="quote-author">- Alan Kay</span>
            </div>
          </div>
        </div>
      ),
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
      year: 'Tomorrow'
    }
  ]

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

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentScene])

  // Set device info when scene changes
  useEffect(() => {
    const scene = scenes[currentScene]
    setCurrentComputer(scene.computer || '')
    setCurrentPhone(scene.phone || '')
    setCurrentYear(scene.year || '')
    
    // Set body data attribute for CSS styling
    document.body.setAttribute('data-scene', scene.id)
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
        opacity: index === 0 ? 1 : 0,
        visibility: index === 0 ? 'visible' : 'hidden'
      })
    })
  }, [])

  // Animate scene transitions with background color blend
  useEffect(() => {
    const ctx = gsap.context(() => {
      scenes.forEach((_, index) => {
        const sceneEl = scenesRef.current[index]
        if (!sceneEl) return

        if (index === currentScene) {
          // Fade in current scene
          gsap.to(sceneEl, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.6,
            ease: 'power2.inOut'
          })

          // Animate content of current scene
          gsap.from(sceneEl.querySelectorAll('.scene-title'), {
            y: 20,
            opacity: 0,
            duration: 0.4,
            delay: 0.3,
            ease: 'power3.out'
          })

          gsap.from(sceneEl.querySelectorAll('.scene-content > *'), {
            y: 15,
            opacity: 0,
            duration: 0.3,
            delay: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
          })

          // Special animations for specific scenes
          if (scenes[currentScene].id === 'new-york') {
            gsap.to(sceneEl.querySelector('.pizza'), {
              rotation: 360,
              scale: 1.1,
              duration: 0.4,
              delay: 0.5,
              ease: 'back.out(1.7)'
            })
          }

          if (scenes[currentScene].id === 'moving') {
            // Animate the travel path
            const travelPath = sceneEl.querySelector('.travel-path')
            if (travelPath) {
              const length = (travelPath as SVGPathElement).getTotalLength()
              gsap.set(travelPath, {
                strokeDasharray: length,
                strokeDashoffset: length
              })
              gsap.to(travelPath, {
                strokeDashoffset: 0,
                duration: 2,
                delay: 0.7,
                ease: 'power2.inOut'
              })
            }
            
            // Animate markers
            gsap.from(sceneEl.querySelectorAll('.location-marker'), {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              delay: 0.5,
              stagger: 1.5,
              ease: 'back.out(1.7)'
            })
          }

          if (scenes[currentScene].id === 'berkeley-life') {
            gsap.from(sceneEl.querySelectorAll('.activity-card'), {
              scale: 0.8,
              opacity: 0,
              duration: 0.3,
              delay: 0.5,
              stagger: 0.05,
              ease: 'power2.out'
            })
          }
        } else {
          // Fade out non-current scenes
          gsap.to(sceneEl, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.6,
            ease: 'power2.inOut'
          })
        }
      })
    })

    return () => ctx.revert()
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
      {(currentComputer || currentPhone) && (
        <div className="fixed-computer-timeline">
          <div className="computer-indicator">
            <div className="current-year">{currentYear}</div>
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
          </div>
        </div>
      )}


      {/* Main viewport with transitioning scenes */}
      <div className="viewport">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            ref={el => { if (el) scenesRef.current[index] = el }}
            className="scene"
            style={{ background: scene.background }}
          >
            <div className="scene-wrapper">
              <h1 className="scene-title">{scene.title}</h1>
              {scene.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App