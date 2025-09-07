import { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';
import gsap from 'gsap';

interface AvatarContext {
  age: number;
}

const avatarMachine = createMachine({
  id: 'tomAvatar',
  initial: 'childhood',
  context: {
    age: 0
  },
  types: {} as {
    context: AvatarContext;
  },
  states: {
    childhood: {
      on: {
        GROW: 'college'
      }
    },
    college: {
      on: {
        GROW: 'chicago',
        BACK: 'childhood'
      }
    },
    chicago: {
      on: {
        GROW: 'startup',
        BACK: 'college'
      }
    },
    startup: {
      on: {
        GROW: 'amazon',
        BACK: 'chicago'
      }
    },
    amazon: {
      on: {
        BACK: 'startup'
      }
    }
  }
});

export function TomAvatar() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, send] = useMachine(avatarMachine);
  const shapesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !shapesRef.current) return;

    const shapes = shapesRef.current.children;
    const tl = gsap.timeline({ repeat: -1 });
    
    // Add rotation and pulsation to the entire group
    gsap.set(shapesRef.current, { transformOrigin: "50% 50%" });
    
    // Slow rotation
    gsap.to(shapesRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
    
    // Pulsation
    gsap.to(shapesRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
    
    switch (state.value) {
      case 'childhood':
        // Simple rotating circles
        Array.from(shapes).forEach((shape, index) => {
          gsap.set(shape, { transformOrigin: "50% 50%" });
          tl.to(shape, {
            rotation: 360,
            duration: 3 + index,
            ease: "none",
            repeat: -1
          }, 0);
          
          tl.to(shape, {
            x: Math.sin(index * Math.PI / 3) * 5,
            y: Math.cos(index * Math.PI / 3) * 5,
            duration: 2 + index * 0.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
          }, 0);
        });
        break;

      case 'college':
        // More complex with hexagons
        Array.from(shapes).forEach((shape, index) => {
          gsap.set(shape, { transformOrigin: "50% 50%" });
          tl.to(shape, {
            rotation: index % 2 ? 360 : -360,
            duration: 4 + index * 0.5,
            ease: "none",
            repeat: -1
          }, 0);
          
          tl.to(shape, {
            scale: 0.8 + Math.sin(index) * 0.2,
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
          }, index * 0.3);
        });
        break;

      case 'chicago':
        // Urban grid-like patterns
        Array.from(shapes).forEach((shape, index) => {
          gsap.set(shape, { transformOrigin: "50% 50%" });
          tl.to(shape, {
            rotation: 90 * (index + 1),
            duration: 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          }, index * 0.2);
          
          tl.to(shape, {
            opacity: 0.4 + (index * 0.2),
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
          }, index * 0.1);
        });
        break;

      case 'startup':
        // Dynamic, energetic patterns
        Array.from(shapes).forEach((shape, index) => {
          gsap.set(shape, { transformOrigin: "50% 50%" });
          const radius = 15 + index * 3;
          const angle = (index * Math.PI * 2) / shapes.length;
          
          tl.to(shape, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            rotation: 720,
            duration: 3,
            ease: "power3.inOut",
            repeat: -1,
            yoyo: true
          }, index * 0.1);
          
          tl.to(shape, {
            scale: 0.5 + Math.random() * 0.5,
            duration: 1 + Math.random(),
            ease: "elastic.out(1, 0.3)",
            repeat: -1,
            yoyo: true
          }, index * 0.2);
        });
        break;

      case 'amazon':
        // Complex, interconnected system
        Array.from(shapes).forEach((shape, index) => {
          gsap.set(shape, { transformOrigin: "50% 50%" });
          const layer = Math.floor(index / 3);
          const angleInLayer = (index % 3) * (Math.PI * 2 / 3);
          
          tl.to(shape, {
            rotation: layer % 2 ? 360 : -360,
            duration: 5 + layer,
            ease: "none",
            repeat: -1
          }, 0);
          
          tl.to(shape, {
            x: Math.cos(angleInLayer + layer) * (10 + layer * 5),
            y: Math.sin(angleInLayer + layer) * (10 + layer * 5),
            duration: 4,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          }, layer * 0.3);
          
          tl.to(shape, {
            opacity: 0.3 + (0.7 / (layer + 1)),
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          }, index * 0.15);
        });
        break;
    }

    return () => {
      tl.kill();
    };
  }, [state.value]);

  const getStateLabel = () => {
    switch (state.value) {
      case 'childhood': return 'Childhood (0-17)';
      case 'college': return 'College Years (18-22)';
      case 'chicago': return 'Chicago Years (22-27)';
      case 'startup': return 'Intuit/NCR & Startup (27-35)';
      case 'amazon': return 'Amazon Years (35-present)';
      default: return '';
    }
  };

  const renderShapes = () => {
    switch (state.value) {
      case 'childhood':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="-12" r="12" fill="url(#grad1)" opacity="1" />
            <circle cx="10.4" cy="6" r="12" fill="url(#grad2)" opacity="1" />
            <circle cx="-10.4" cy="6" r="12" fill="url(#grad3)" opacity="1" />
          </g>
        );

      case 'college':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="0" r="8" fill="url(#grad1)" opacity="1" />
            <circle cx="0" cy="-16" r="5" fill="url(#grad2)" opacity="1" />
            <circle cx="13.9" cy="-8" r="5" fill="url(#grad2)" opacity="1" />
            <circle cx="13.9" cy="8" r="5" fill="url(#grad2)" opacity="1" />
            <circle cx="0" cy="16" r="5" fill="url(#grad2)" opacity="1" />
            <circle cx="-13.9" cy="8" r="5" fill="url(#grad2)" opacity="1" />
            <circle cx="-13.9" cy="-8" r="5" fill="url(#grad2)" opacity="1" />
          </g>
        );

      case 'chicago':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="0" r="20" fill="none" stroke="url(#grad1)" strokeWidth="1" opacity="1" />
            <circle cx="0" cy="0" r="15" fill="url(#grad2)" opacity="1" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="url(#grad3)" strokeWidth="1" opacity="1" />
            <circle cx="0" cy="0" r="5" fill="url(#grad4)" opacity="1" />
            <circle cx="0" cy="-12" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="12" cy="0" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="0" cy="12" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="-12" cy="0" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="8.5" cy="-8.5" r="2.5" fill="url(#grad2)" opacity="1" />
          </g>
        );

      case 'startup':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="-16" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="13.9" cy="-8" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="13.9" cy="8" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="0" cy="16" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="-13.9" cy="8" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="-13.9" cy="-8" r="4" fill="url(#grad1)" opacity="1" />
            <circle cx="0" cy="0" r="7" fill="none" stroke="url(#grad2)" strokeWidth="1" opacity="1" />
            <circle cx="0" cy="-10" r="3" fill="url(#grad3)" opacity="1" />
            <circle cx="8.7" cy="-5" r="3" fill="url(#grad3)" opacity="1" />
            <circle cx="8.7" cy="5" r="3" fill="url(#grad3)" opacity="1" />
            <circle cx="0" cy="10" r="3" fill="url(#grad3)" opacity="1" />
            <circle cx="-8.7" cy="5" r="3" fill="url(#grad3)" opacity="1" />
          </g>
        );

      case 'amazon':
        return (
          <g ref={shapesRef}>
            {/* Inner core - 6 circles */}
            <circle cx="0" cy="0" r="5" fill="url(#grad5)" opacity="1" />
            <circle cx="0" cy="-8" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="7" cy="-4" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="7" cy="4" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="0" cy="8" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="-7" cy="4" r="2.5" fill="url(#grad1)" opacity="1" />
            <circle cx="-7" cy="-4" r="2.5" fill="url(#grad1)" opacity="1" />
            
            {/* Middle layer - 6 circles */}
            <circle cx="0" cy="0" r="16" fill="none" stroke="url(#grad2)" strokeWidth="1" opacity="1" />
            <circle cx="0" cy="-14" r="3" fill="url(#grad3)" opacity="1" />
            <circle cx="12.1" cy="-7" r="3" fill="url(#grad3)" opacity="1" />
            
            {/* Outer layer - 3 circles */}
            <circle cx="0" cy="0" r="28" fill="none" stroke="url(#grad4)" strokeWidth="1" opacity="1" />
            <circle cx="0" cy="-24" r="2" fill="url(#grad5)" opacity="1" />
            <circle cx="20.8" cy="-12" r="2" fill="url(#grad5)" opacity="1" />
            <circle cx="20.8" cy="12" r="2" fill="url(#grad5)" opacity="1" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <svg 
        ref={svgRef}
        width="100" 
        height="100" 
        viewBox="-60 -60 120 120"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124, 58, 237, 0.9)" />
            <stop offset="100%" stopColor="rgba(124, 58, 237, 0.3)" />
          </radialGradient>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.9)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
          </radialGradient>
          <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.9)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </radialGradient>
          <radialGradient id="grad4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.9)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
          </radialGradient>
          <radialGradient id="grad5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.9)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
          </radialGradient>
        </defs>
        
        {renderShapes()}
      </svg>
      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#e0e0e0' }}>{getStateLabel()}</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {state.can({ type: 'BACK' }) && (
            <button onClick={() => send({ type: 'BACK' })}>Previous</button>
          )}
          {state.can({ type: 'GROW' }) && (
            <button onClick={() => send({ type: 'GROW' })}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}