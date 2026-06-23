import axios from "axios"
import { API_ROOT } from "~/utils/constants"

export const fetchCardDetailAPI = async (cardId) => {
  const response = await axios.get(`${API_ROOT}/v1/cards/${cardId}`)
  return response.data
}
export const createNewCardAPI = async (cardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, cardData)
  return response.data
}
