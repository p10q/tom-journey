import './App.css'
import { TomAvatar } from './components/TomAvatar'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a'
    }}>
      <TomAvatar />
    </div>
  )
}

export default App