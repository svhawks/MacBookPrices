const axios = require('axios')
let db = []
export default {
  updateDB () {
    
  },
  fetchMacs () {
    axios.get('https://batin.github.io/MacScoresDB/db.json')
      .then(macs => {
        return macs.data.macs
        //console.log(this.db)
      })
      .catch(err => {
        console.log(err)
      })
    
    
  },
  fetchMacById (id) {
    this.updateDB()
    return this.db
  }
}
