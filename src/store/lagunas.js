import { create } from "zustand"
import { db } from "../firebase/config"
import { ref, onValue, push, remove, update, set } from "firebase/database"

const lagunasRef = ref(db, "Lagunas/")

export const useLagunasStore = create((put, get) => {
  return {
    lagunas: [],
    fetchLagunas: async () => {
      onValue(lagunasRef, (snapshot) => {
        const data = snapshot.val()

        if (data) {
          const lagunasArray = Object.entries(data).map(
            ([lagunaId, lagunaData]) => {
              const aireadoresArray = lagunaData.Aireadores
                ? Object.entries(lagunaData.Aireadores).map(
                    ([aireadorId, aireadorData]) => ({
                      id: aireadorId,
                      ...aireadorData,
                    })
                  )
                : []

              return {
                id: lagunaId,
                aireadores: aireadoresArray,
                od: lagunaData.od || 0,
                orp: lagunaData.orp || 0,
              }
            }
          )

          put({ lagunas: lagunasArray })
        }
      })
    },
    createEmptyLaguna: async () => {
      const newLagunaRef = push(lagunasRef)
      const newLagunaId = newLagunaRef.key

      const emptyLaguna = {
        od: 0,
        orp: 0,
      }

      put((state) => ({
        lagunas: [...state.lagunas, { id: newLagunaId, ...emptyLaguna }],
      }))
      update(newLagunaRef, emptyLaguna)
    },

    deleteLaguna: async (fireid) => {
      const childNode = ref(db, `Lagunas/${fireid}`)
      remove(childNode)
    },

    changeOdValue: async (lagunaId, value) => {
      set(ref(db, `Lagunas/${lagunaId}/od/`), value)
      put((state) => {
        const lagunas = state.lagunas.map((laguna) => {
          if (laguna.id === lagunaId) {
            return { ...laguna, od: value }
          }
          return laguna
        })
        return { lagunas }
      })
    },

    changeOrpValue: async (lagunaId, value) => {
      set(ref(db, `Lagunas/${lagunaId}/orp/`), value)
      put((state) => {
        const lagunas = state.lagunas.map((laguna) => {
          if (laguna.id === lagunaId) {
            return { ...laguna, orp: value }
          }
          return laguna
        })
        return { lagunas }
      })
    },

    addAireador: async (lagunaId) => {
      const aireador = {
        frecuencia: 0,
      }

      push(ref(db, `Lagunas/${lagunaId}/Aireadores/`), aireador)
    },

    changeAireadorFrecuencia: async (lagunaId, aireadorId, value) => {
      set(
        ref(db, `Lagunas/${lagunaId}/Aireadores/${aireadorId}/frecuencia`),
        value
      )
      put((state) => {
        const lagunas = state.lagunas.map((laguna) => {
          if (laguna.id === lagunaId) {
            const aireadores = laguna.aireadores.map((aireador) => {
              if (aireador.id === aireadorId) {
                return { ...aireador, frecuencia: value }
              }
              return aireador
            })
            return { ...laguna, aireadores }
          }
          return laguna
        })
        return { lagunas }
      })
    },
  }
})
