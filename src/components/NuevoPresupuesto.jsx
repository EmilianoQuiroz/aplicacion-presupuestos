import { useState } from 'react'
//Importamos el componente de mensaje
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ 
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto 
}) => {

  const [mensaje, setMensaje] = useState('')
  
  const handlePresupuesto = (e) => {
    e.preventDefault();

    // Validamos que el monto ingresado sea de tipo numerico y positivo
    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto valido')

      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)

  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form 
          onSubmit={handlePresupuesto} 
          className="formulario"
        >
            <div className="campo">
                <label>Definir Presupuesto</label>

                <input
                    className="nuevo-presupuesto"
                    type="number"
                    placeholder="Agrega tu presupuesto"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Añadir" />

            {/** Mensaje de error */}
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto