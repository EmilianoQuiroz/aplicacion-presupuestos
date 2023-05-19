import React from 'react'
// Importamos el componente NuevoPresupuesto
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ 
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto
}) => {

  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidPresupuesto ? (
          <p>Control Presupuesto</p>
        ) : (
          <NuevoPresupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}
    </header>

  )
}

export default Header