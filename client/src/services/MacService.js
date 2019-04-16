import PouchDB from 'pouchdb'
const db = new PouchDB('mac_scores')
const datas = require('./db.json')

export default {
  create() { //puts all docs to db
    db.bulkDocs(datas.macs, function (err, response) {
      if (err) {
        return console.log(err);
      } else {
        console.log("Documents created Successfully");
      }
    })
  },
  deleteDocs () { // removes all docs from db 
    datas.macs.forEach(mac => {
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
