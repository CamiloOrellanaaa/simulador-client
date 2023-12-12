import { AddAireador } from "./AddAireador"
import { Aireador } from "./Aireador"
import { useLagunasStore } from "../store/lagunas"

// eslint-disable-next-line react/prop-types
export const Aireadores = ({ lagunaId }) => {
  const laguna = useLagunasStore((state) =>
    state.lagunas.find((laguna) => laguna.id === lagunaId)
  )

  const addAireador = useLagunasStore((state) => state.addAireador)

  if (!laguna) {
    return null
  }

  const { aireadores } = laguna

  const handleAddAireador = () => {
    addAireador(lagunaId)
  }

  return (
    <div className='p-5 row'>
      <div className='col-6'>
        <h1 className='text-white mb-0 fs-2'>Laguna {lagunaId}</h1>
        <p className='text-secondary'>Aireadores</p>
      </div>
      <div className='col-6 text-end text-white lightbtn'>
        <p className='m-0'>Consumo Laguna: </p>
        <p className='m-0'>OD: {laguna.od}</p>
        <p className='m-0'>ORP: {laguna.orp}</p>
      </div>
      <div className='row mx-auto'>
        {aireadores.map((aireador) => (
          <Aireador
            key={aireador.id}
            id={aireador.id}
            freq={aireador.frecuencia}
            lagunaId={lagunaId}
            encendido={aireador.encendido}
          />
        ))}
        <AddAireador lagunaId={lagunaId} onClick={handleAddAireador} />
      </div>
    </div>
  )
}
