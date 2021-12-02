import { useQuery } from "react-query";
import { api } from "../api";

export function useInventory(page: number){
  return useQuery(['inventory', page], async () => {
    const { data, headers } = await api.get('inventory', {
      params: {
        page
      }
    })

    const totalCount = Number(headers['x-total-count'])

    const inventory = data.inventory.map(product => {
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