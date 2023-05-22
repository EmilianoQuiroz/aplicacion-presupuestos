import { useState } from 'react'
// Importamos el Header
import Header from './components/Header'
// Importamos el modal 
import Modal from './components/Modal'
// Importamos el listado de gastos
import ListadoGastos from './components/ListadoGastos'
// Importamos la funcion para generar un Id unico
import { generarId } from './helpers'
// Importamos Icono
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState([])
  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = Date.now()// Retornamos la fecha en la que se genera el objeto
    setGastos([...gastos, gasto])

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500)

  }
  return (
      <div className={modal && 'fijar'}>
        <Header 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

        {modal && 
        <Modal 
          setModal ={setModal}
          animarModal ={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />}

      </div>
  )
}

export default App
