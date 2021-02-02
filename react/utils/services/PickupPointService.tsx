import axios from 'axios'

const API_URL = `/_v/api/pickuppoint/`
const API_URL_ALL = '/_v/api/pickuppoints/'

const getAll = () => {
  return axios.get(API_URL_ALL)
}

const getById = (id: string) => {
  return axios.get(API_URL + id)
}

export default { getAll, getById }
