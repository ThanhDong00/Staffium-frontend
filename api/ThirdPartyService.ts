import axios from "axios"

export const ThirdPartyService = {
  getAllNationality: async (): Promise<any> => {
    return await axios.get('https://restcountries.com/v3.1/all?fields=name')
      .then(res => res.data)
      .catch(err => err.response.data)
  }
}