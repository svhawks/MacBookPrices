import PouchDB from 'pouchdb'
const db = new PouchDB('mac_scores')
const axios = require('axios')
const datas = require('./../../../db')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
export default {
  updateDB () {
    axios.get('https://raw.githubusercontent.com/batin/MacScores/master/db.json')
      .then(macs => {
        console.log(macs)
        this.load(macs)
        this.deleteDocs(macs)
      })
      .catch(err => {
        console.log(err)
      })

  },
  load (macs) { //puts all docs to db
    db.bulkDocs(macs, function (err, response) {
      if (err) {
        return console.log(err)
      } else {
        console.log("Documents created Successfully")
      }
    })
  },
  deleteDocs (macs) { // removes all docs from db 
    macs.forEach(mac => {
      db.get(mac._id, function (err, doc) {
        if (err) { 
        return console.log(err) }
        db.remove(doc, function (err, response) {
          if (err) { return console.log(err) }
        })
      })
    })

  },
  fetchMacs () {
    return db.allDocs({ include_docs: true })
  },
  fetchMacById (id) {
    return db.get(`${id}`) 
  }
}
