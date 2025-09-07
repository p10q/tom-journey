import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TomAvatar } from './components/TomAvatar'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentComputer, setCurrentComputer] = useState<string>('none')
  const [currentYear, setCurrentYear] = useState<string>('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        opacity: 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Section animations
      gsap.utils.toArray('.story-section').forEach((section: any) => {
        gsap.from(section.querySelector('.section-title'), {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1
        })

        const content = section.querySelector('.section-content')
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2
          })
        }
      })

      // Pizza bounce animation
      gsap.to('.pizza', {
        scrollTrigger: {
          trigger: '.pizza',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.7)'
      })

      // Moving animation path
      const pathLine = document.querySelector('.path-line')
      if (pathLine) {
        gsap.fromTo(pathLine, 
          { width: '0%' },
          {
            scrollTrigger: {
              trigger: '[data-section="moving"]',
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: true
            },
            width: '100%',
            duration: 1
          }
        )
      }

      // Activity cards stagger animation
      gsap.from('.activity-card', {
        scrollTrigger: {
          trigger: '.activities-grid',
          start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      })

      // Timeline items animation
      gsap.utils.toArray('.timeline-item').forEach((item: any, index: number) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        })
      })

      // Update computer timeline based on scroll position
      ScrollTrigger.create({
        trigger: '[data-section="new-york"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentComputer('none')
          setCurrentYear('1980s')
        },
        onEnterBack: () => {
          setCurrentComputer('none')
          setCurrentYear('1980s')
        }
      })

      ScrollTrigger.create({
        trigger: '[data-section="berkeley-life"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentComputer('Apple IIgs')
          setCurrentYear('Late 1980s')
        },
        onEnterBack: () => {
          setCurrentComputer('Apple IIgs')
          setCurrentYear('Late 1980s')
        }
      })

      ScrollTrigger.create({
        trigger: '[data-year="early-90s"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentComputer('Macintosh LC III')
          setCurrentYear('Early 1990s')
        },
        onEnterBack: () => {
          setCurrentComputer('Macintosh LC III')
          setCurrentYear('Early 1990s')
        }
      })

      ScrollTrigger.create({
        trigger: '[data-year="late-90s"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentComputer('Gateway 2000')
          setCurrentYear('Late 1990s')
        },
        onEnterBack: () => {
          setCurrentComputer('Gateway 2000')
          setCurrentYear('Late 1990s')
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="app-container">
      {/* Fixed Tom Avatar */}
      <div className="fixed-avatar">
        <TomAvatar />
      </div>

      {/* Fixed Computer Timeline */}
      <div className="fixed-computer-timeline">
        <div className="computer-indicator">
          <div className="current-year">{currentYear}</div>
          <div className="current-computer">
            {currentComputer !== 'none' && (
              <>
                <span className="computer-icon">💻</span>
                <span className="computer-name">{currentComputer}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="content">
          <h1 className="hero-title">My Journey</h1>
          <p className="hero-subtitle">A story of growing up in two cities</p>
          <div className="scroll-indicator">
            <span>Scroll to begin</span>
            <div className="arrow-down">↓</div>
          </div>
        </div>
      </section>

      {/* Born in New York */}
      <section className="story-section" data-section="new-york">
        <div className="content">
          <h2 className="section-title">Born in New York</h2>
          <div className="section-content">
            <p className="narrative">The story begins in the city that never sleeps...</p>
            <div className="pizza-love">
              <span className="emoji pizza">🍕</span>
              <p>First love: New York pizza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Moving to Berkeley */}
      <section className="story-section" data-section="moving">
        <div className="content">
          <h2 className="section-title">Age 5: Moving West</h2>
          <div className="section-content">
            <p className="narrative">From coast to coast, a new chapter begins in Berkeley, California</p>
            <div className="moving-animation">
              <div className="path-container">
                <div className="path-line"></div>
                <div className="location-marker start">NYC</div>
                <div className="location-marker end">Berkeley</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berkeley Montessori */}
      <section className="story-section" data-section="montessori">
        <div className="content">
          <h2 className="section-title">Berkeley Montessori</h2>
          <div className="section-content">
            <p className="narrative">Learning and growing in a nurturing environment</p>
            <div className="school-memories">
              <div className="memory-item">📚 Hands-on learning</div>
              <div className="memory-item">🎨 Creative exploration</div>
              <div className="memory-item">👫 Making friends</div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing Up in Berkeley */}
      <section className="story-section" data-section="berkeley-life">
        <div className="content">
          <h2 className="section-title">Growing Up in Berkeley</h2>
          <div className="section-content">
            <div className="activities-grid">
              <div className="activity-card" data-activity="biking">
                <span className="icon">🚴</span>
                <h3>Biking</h3>
                <p>Exploring the hills and neighborhoods</p>
              </div>
              <div className="activity-card" data-activity="skateboard">
                <span className="icon">🛹</span>
                <h3>Skateboarding</h3>
                <p>Learning tricks and finding freedom</p>
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
        </div>
      </section>

      {/* Computer Timeline */}
      <section className="story-section" data-section="computers">
        <div className="content">
          <h2 className="section-title">My Digital Evolution</h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            
            <div className="timeline-item" data-year="late-80s">
              <div className="year">Late 1980s</div>
              <div className="computer-card">
                <h3>Apple IIgs</h3>
                <div className="computer-icon">🖥️</div>
                <p>My first computer - where the magic began</p>
              </div>
            </div>
            
            <div className="timeline-item" data-year="early-90s">
              <div className="year">Early 1990s</div>
              <div className="computer-card">
                <h3>Macintosh LC III</h3>
                <div className="computer-icon">🖥️</div>
                <p>The color Mac that opened new creative possibilities</p>
              </div>
            </div>
            
            <div className="timeline-item" data-year="late-90s">
              <div className="year">Late 1990s</div>
              <div className="computer-card">
                <h3>Gateway 2000</h3>
                <div className="computer-icon">🖥️</div>
                <p>Complete with TV tuner card - computing meets entertainment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App