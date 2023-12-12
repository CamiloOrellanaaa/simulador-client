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

      put({ lagunas: [...get().lagunas, { id: newLagunaId, ...emptyLaguna }] })
      update(newLagunaRef, emptyLaguna)
    },

    deleteLaguna: async (fireid) => {
      const childNode = ref(db, `Lagunas/${fireid}`)
      remove(childNode)
    },

    changeOdValue: async (lagunaId, value) => {
      set(ref(db, `Lagunas/${lagunaId}/od/`), value)
    },

    changeOrpValue: async (lagunaId, value) => {
      set(ref(db, `Lagunas/${lagunaId}/orp/`), value)
    },

    addAireador: async (lagunaId) => {
      const aireador = {
        frecuencia: 0,
        encendido: true,
      }

      push(ref(db, `Lagunas/${lagunaId}/Aireadores/`), aireador)
    },

    turnOffAireador: async (lagunaId, fireid) => {
      set(ref(db, `Lagunas/${lagunaId}/Aireadores/${fireid}/encendido/`), false)
      set(ref(db, `Lagunas/${lagunaId}/Aireadores/${fireid}/frecuencia`), 0)
    },

    turnOnAireador: async (lagunaId, fireid) => {
      set(ref(db, `Lagunas/${lagunaId}/Aireadores/${fireid}/encendido/`), true)
    },

    deleteAireador: async (lagunaId, fireid) => {
      const childNode = ref(db, `Lagunas/${lagunaId}/Aireadores/${fireid}`)
      remove(childNode)
    },

    changeAireadorFrecuencia: async (lagunaId, aireadorId, value) => {
      set(
        ref(db, `Lagunas/${lagunaId}/Aireadores/${aireadorId}/frecuencia`),
        value
      )
    },
  }
})
