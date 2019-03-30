import Api from './Api'

export default {
  fetchMacs () {
    return Api().get('/api/')
  },
  fetchMacById (params) {
    return Api().get(`/api/macs/${params}`)
  },
  filterMacs (params) {
    return Api().get(`/api${params}`)
  }
}

