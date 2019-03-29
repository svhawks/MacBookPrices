import Api from './Api'

export default {
  fetchMacs () {
    return Api().get('/api')
  },
  fetchMacById (params) {
    return Api().get(`/api/macs/${params}`)
  }
  // addPost (params) {
  //   return Api().post('add_post', params)
  // },

  // updatePost (params) {
  //   return Api().put('posts/' + params.id, params)
  // },

  // getPost (params) {
  //   return Api().get('post/' + params.id)
  // },

  // deletePost (id) {
  //   return Api().delete('posts/' + id)
}

