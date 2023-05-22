import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar
  }) => {

  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId]= useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const ocultarModal = () => {
      setAnimarModal(false)

      setTimeout(() => {
        setModal(false)
      }, 500)
  }

const handleSubmit = e => {
  e.preventDefault()
  /**
   * En caso de que alguna de estas categorias esten vacias
   * entonces aparecera el mensaje indicado desde setMensaje
   * Luego de 3 segudos con setTimeOut este mensaje desaparece
   */
  if([ nombre, cantidad, categoria ].includes('')) {
    setMensaje('Todos los campos son obligarorios')
    
    setTimeout(() => {
      setMensaje('')
    }, 3000)
    return
  }
  /**
   * En caso de que se pasen las validaciones se procede a 
   * guardar los datos definidos en los inputs
   */
  guardarGasto({nombre, cantidad, categoria, id, fecha})
}

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="Cerrar Modal"
                onClick={ocultarModal}
            />
        </div>

        <form 
          onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        >
          <legend>{gastoEditar.nombre ? "Editar gasto": "Nuevo gasto"}</legend>
          {/** Mensaje de error */}
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className="campo">
            <label htmlFor="nombre">Nombre Gastos</label>
            <input 
              id="nombre"
              type='text'
              placeholder='Añade el nombre del gasto'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          
          <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input 
              id="nombre"
              type='number'
              placeholder='Añade la cantidad del gasto ej: 300'
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
            />
          </div>

          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select
              id='categoria'
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>

          <input 
            type='submit'
            value={gastoEditar.nombre ? "Guardar cambios": "Añadir gasto"}
          />

        </form>
    </div>
  )
}

export default Modal