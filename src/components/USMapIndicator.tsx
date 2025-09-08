
interface USMapIndicatorProps {
  currentLocation: string
}

export function USMapIndicator({ currentLocation }: USMapIndicatorProps) {

  if (!currentLocation) return null

  const formatLocationName = (location: string) => {
    if (location === 'sf-peninsula') {
      return 'SF Peninsula'
    }
    return location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="fixed-map-indicator">
      <div className="globe-container">
        <div className="globe-wrapper">
          <img 
            src="./world_na.svg" 
            alt="World Globe" 
            className="globe-image"
          />
          <svg viewBox="0 0 550 550" className="location-overlay">
            {/* Location dots positioned for world_na.svg coordinate system */}
            <g>
              {/* New York */}
              <circle 
                cx="348" 
                cy="263" 
                r="20" 
                fill="#FF0000" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
                className={currentLocation === 'new-york' ? 'location-active' : 'location-inactive'}
              />
              {/* SF/Berkeley */}
              <circle 
                cx="187" 
                cy="280" 
                r="20" 
                fill="#FF0000" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
                className={currentLocation === 'berkeley' || currentLocation === 'sf-peninsula' ? 'location-active' : 'location-inactive'}
              />
              {/* Amherst */}
              <circle 
                cx="343" 
                cy="258" 
                r="20" 
                fill="#FF0000" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
                className={currentLocation === 'amherst' ? 'location-active' : 'location-inactive'}
              />
              {/* Chicago */}
              <circle 
                cx="305" 
                cy="270" 
                r="20" 
                fill="#FF0000" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
                className={currentLocation === 'chicago' ? 'location-active' : 'location-inactive'}
              />
            </g>
          </svg>
        </div>
        <div className="location-label">{formatLocationName(currentLocation)}</div>
      </div>
    </div>
  )
}