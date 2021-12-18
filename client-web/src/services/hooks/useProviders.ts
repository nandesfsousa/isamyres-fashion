import { useQuery } from "react-query";
import { api } from "../api";

export default function useProviders() {
  return useQuery(['providers'], async () => {
    const { data, headers } = await api.get('/providers/')
    const totalCount = data.payload.length

    const list = data.payload.map(provider => {
      return {
        id: provider.id,
        cnpj: provider.cnpj,
        name: provider.name
      }
    })

    return {
      list,
      totalCount
    }
  })
}