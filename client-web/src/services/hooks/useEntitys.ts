import { useQuery } from "react-query";
import { api } from "../api";

export default function useEntitys(){
  return useQuery(['entitys'], async () => {
    const { data, headers } = await api.get('/entitys/')
    const totalCount = data.payload.length
    
    const list = data.payload.map(entity => {
      return {
        id: entity.id,
        cnpj: entity.cnpj,
        name: entity.name
      }
    })

    return {
      list,
      totalCount  
    }
  })
}