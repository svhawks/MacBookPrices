import Api from './Api'

export default {
  fetchMacs (params) {
    return Api().get(`/api${params}`)
  },
  fetchMacById (params) {
    return Api().get(`/api/macs/${params}`)
  }
}

