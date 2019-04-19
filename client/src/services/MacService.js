import PouchDB from 'pouchdb'
const db = new PouchDB('mac_scores')
const datas = require('./../../../db')
// const axios = require('axios')

export default {
  // updateDB () {
  //   axios.get('https://raw.githubusercontent.com/batin/MacScores/master/db.json', 
  //   {
  //     headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': 'true',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Accept': 'application/json'
  //   }
  // })
  //     .then(macs => {
  //       console.log(macs)
  //       this.load(macs)
  //       this.deleteDocs(macs)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  load () { //puts all docs to db
    db.bulkDocs(datas.macs, function (err, response) {
      if (err) {
        return console.log(err)
      } else {
        console.log("Documents created Successfully")
      }
    })
  },
  // deleteDocs (macs) { // removes all docs from db 
  //   macs.forEach(mac => {
  //     db.get(mac._id, function (err, doc) {
  //       if (err) { 
  //       return console.log(err) }
  //       db.remove(doc, function (err, response) {
  //         if (err) { return console.log(err) }
  //       })
  //     })
  //   })
  // },
  fetchMacs () {
    this.load()
    return db.allDocs({ include_docs: true })
  },
  fetchMacById (id) {
    return db.get(`${id}`) 
  }
}
