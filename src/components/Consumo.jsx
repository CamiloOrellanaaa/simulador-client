import React, { useEffect, useState } from "react"
import { useConsumoStore } from "../store/consumo" 
import { useLagunasStore } from "../store/lagunas"

export const Consumo = ({ consumo }) => {
  const [claseExtra, setClaseExtra] = useState("")

  const fetch = useLagunasStore((state) => state.fetchLagunas)

  useEffect(() => {
    fetch()
  }, [])

  const determinarClasesExtra = (valorConsumo) => {
    let nuevasClases = ""
    if (valorConsumo < 30) {
      nuevasClases += " bg-success"
    }
    if (valorConsumo > 60) {
      nuevasClases += " bg-warning"
    }
    if (valorConsumo > 75) {
      nuevasClases += " bg-danger"
    }
    return nuevasClases
  }

  useEffect(() => {
    const nuevasClases = determinarClasesExtra(consumo)
    setClaseExtra(nuevasClases)
  }, [consumo])

  return (
    <div
      className='progress col-9 m-2 float-end'
      role='progressbar'
      aria-label='Example with label'
      aria-valuenow={consumo}
      aria-valuemin='0'
      aria-valuemax='100'
    >
      <div
        className={`progress-bar${claseExtra}`}
        style={{ width: `${consumo}%` }}
      >
        {consumo}%
      </div>
    </div>
  )
}
