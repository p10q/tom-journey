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
            x: Math.sin(index * Math.PI / 3) * 20,
            y: Math.cos(index * Math.PI / 3) * 20,
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
          const radius = 50 + index * 20;
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
            x: Math.cos(angleInLayer + layer) * (30 + layer * 30),
            y: Math.sin(angleInLayer + layer) * (30 + layer * 30),
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
      case 'amazon': return 'Amazon Years (35-43)';
      default: return '';
    }
  };

  const renderShapes = () => {
    switch (state.value) {
      case 'childhood':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="-50" r="60" fill="url(#grad1)" opacity="0.7" />
            <circle cx="43" cy="25" r="60" fill="url(#grad2)" opacity="0.7" />
            <circle cx="-43" cy="25" r="60" fill="url(#grad3)" opacity="0.7" />
          </g>
        );

      case 'college':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="0" r="40" fill="url(#grad1)" opacity="0.6" />
            <circle cx="0" cy="-60" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="52" cy="-30" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="52" cy="30" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="0" cy="60" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="-52" cy="30" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="-52" cy="-30" r="25" fill="url(#grad2)" opacity="0.5" />
            <circle cx="30" cy="0" r="20" fill="url(#grad3)" opacity="0.4" />
            <circle cx="-30" cy="0" r="20" fill="url(#grad3)" opacity="0.4" />
            <circle cx="0" cy="0" r="15" fill="url(#grad4)" opacity="0.5" />
          </g>
        );

      case 'chicago':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="0" r="80" fill="none" stroke="url(#grad1)" strokeWidth="3" opacity="0.6" />
            <circle cx="0" cy="0" r="60" fill="url(#grad2)" opacity="0.3" />
            <circle cx="0" cy="0" r="40" fill="none" stroke="url(#grad3)" strokeWidth="2" opacity="0.7" />
            <circle cx="0" cy="0" r="20" fill="url(#grad4)" opacity="0.5" />
            <circle cx="0" cy="-50" r="10" fill="url(#grad1)" opacity="0.4" />
            <circle cx="50" cy="0" r="10" fill="url(#grad1)" opacity="0.4" />
            <circle cx="0" cy="50" r="10" fill="url(#grad1)" opacity="0.4" />
            <circle cx="-50" cy="0" r="10" fill="url(#grad1)" opacity="0.4" />
          </g>
        );

      case 'startup':
        return (
          <g ref={shapesRef}>
            <circle cx="0" cy="-70" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="60" cy="-35" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="60" cy="35" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="0" cy="70" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="-60" cy="35" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="-60" cy="-35" r="20" fill="url(#grad1)" opacity="0.6" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="url(#grad2)" strokeWidth="3" opacity="0.7" />
            <circle cx="0" cy="-40" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="35" cy="-20" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="35" cy="20" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="0" cy="40" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="-35" cy="20" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="-35" cy="-20" r="15" fill="url(#grad3)" opacity="0.4" />
            <circle cx="0" cy="0" r="15" fill="url(#grad5)" opacity="0.8" />
          </g>
        );

      case 'amazon':
        return (
          <g ref={shapesRef}>
            {/* Inner core */}
            <circle cx="0" cy="0" r="20" fill="url(#grad5)" opacity="0.9" />
            <circle cx="0" cy="-30" r="12" fill="url(#grad1)" opacity="0.7" />
            <circle cx="26" cy="-15" r="12" fill="url(#grad1)" opacity="0.7" />
            <circle cx="26" cy="15" r="12" fill="url(#grad1)" opacity="0.7" />
            <circle cx="0" cy="30" r="12" fill="url(#grad1)" opacity="0.7" />
            <circle cx="-26" cy="15" r="12" fill="url(#grad1)" opacity="0.7" />
            <circle cx="-26" cy="-15" r="12" fill="url(#grad1)" opacity="0.7" />
            
            {/* Middle layer */}
            <circle cx="0" cy="0" r="60" fill="none" stroke="url(#grad2)" strokeWidth="2" opacity="0.6" />
            <circle cx="0" cy="-50" r="15" fill="url(#grad3)" opacity="0.5" />
            <circle cx="43" cy="-25" r="15" fill="url(#grad3)" opacity="0.5" />
            <circle cx="43" cy="25" r="15" fill="url(#grad3)" opacity="0.5" />
            <circle cx="0" cy="50" r="15" fill="url(#grad3)" opacity="0.5" />
            <circle cx="-43" cy="25" r="15" fill="url(#grad3)" opacity="0.5" />
            <circle cx="-43" cy="-25" r="15" fill="url(#grad3)" opacity="0.5" />
            
            {/* Outer layer */}
            <circle cx="0" cy="0" r="90" fill="none" stroke="url(#grad4)" strokeWidth="1.5" opacity="0.4" />
            <circle cx="0" cy="-80" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="69" cy="-40" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="69" cy="40" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="0" cy="80" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="-69" cy="40" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="-69" cy="-40" r="10" fill="url(#grad5)" opacity="0.3" />
            <circle cx="0" cy="0" r="100" fill="none" stroke="url(#grad1)" strokeWidth="1" opacity="0.2" />
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
        width="400" 
        height="400" 
        viewBox="-200 -200 400 400"
        style={{ background: '#0a0a0a', borderRadius: '20px' }}
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
          </radialGradient>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.2)" />
          </radialGradient>
          <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.2)" />
          </radialGradient>
          <radialGradient id="grad4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.2)" />
          </radialGradient>
          <radialGradient id="grad5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.8)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
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