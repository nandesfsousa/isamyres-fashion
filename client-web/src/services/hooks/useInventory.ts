import { useQuery } from "react-query";
import { api } from "../api";

export function useInventory(page: number, take:number){
  return useQuery(['inventory', page], async () => {
    const { data, headers } = await api.get('/inventory/', {
      params: {
        page,
        take
      }
    })
    const totalCount = data.payload.length

    const inventory = data.payload.map(product => {
      return {
        id: product.id,
        descriprion: product.description,
        quantity: product.quantity,
        createdAt: new Date(product.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    return {
      inventory,
      totalCount  
    }
  })
}