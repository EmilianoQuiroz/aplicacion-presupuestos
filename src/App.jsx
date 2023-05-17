import { useState } from 'react'
// Importamos el Header
import Header from './components/Header'

function App() {

  const [presupuesto, setPresupuesto] = useState(0)

  return (
      <div>
        <Header 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        />
      </div>
  )
}

export default App
