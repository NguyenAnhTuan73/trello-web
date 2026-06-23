import axios from "axios"
import { API_ROOT } from "~/utils/constants"

export const fetchColumnDetailAPI = async (columnId) => {
  const response = await axios.get(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}
export const createNewColumnAPI = async (columnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, columnData)
  return response.data
}
export const getListColumnsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/columns`)
  return response.data
}
