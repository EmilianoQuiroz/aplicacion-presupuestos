import { useState, useEffect } from 'react'
// Importamos el Header
import Header from './components/Header'
// Importamos los filtros
import Filtros from './components/Filtros'
// Importamos el modal 
import Modal from './components/Modal'
// Importamos el listado de gastos
import ListadoGastos from './components/ListadoGastos'
// Importamos la funcion para generar un Id unico
import { generarId } from './helpers'
// Importamos Icono
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? []),
  ]);

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  // Guardamos los datos en el Local Storage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    setModal(false)
  },[gastos])

// filtro
  useEffect(() => {
    if(filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS>0) {
      setIsValidPresupuesto(true)
    }
  },[])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      // Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()// Retornamos la fecha en la que se genera el objeto
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
    setGastoEditar({})
  }
  return (
      <div className={modal  ? 'fijar' : ''}>
        <Header
          gastos={gastos}
          setGastos={setGastos} 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
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
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

      </div>
  )
}

export default App
