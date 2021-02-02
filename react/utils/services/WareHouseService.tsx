import axios from 'axios'

const API_URL = `/_v/api/warehouse/`

const getById = (id: string) => {
  return axios.get(API_URL + id)
}

export default { getById }
